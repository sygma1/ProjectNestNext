import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Server } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServerDto } from './dto/create-server.dto';
import { QueryServerDto } from './dto/query-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryServerDto): Promise<{
    data: Server[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const where: Prisma.ServerWhereInput = {};

    if (query.provider) where.provider = query.provider;
    if (query.region) where.region = query.region;
    if (query.status) where.status = query.status;
    if (query.projectId) where.projectId = query.projectId;
    if (query.search) {
      where.OR = [
        { provider: { contains: query.search, mode: 'insensitive' } },
        { region: { contains: query.search, mode: 'insensitive' } },
        { ip: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.server.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { provider: 'asc' },
      }),
      this.prisma.server.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<Server> {
    const server = await this.prisma.server.findUnique({ where: { id } });
    if (!server) throw new NotFoundException(`Server ${id} not found`);
    return server;
  }

  create(dto: CreateServerDto): Promise<Server> {
    return this.prisma.server.create({ data: dto });
  }

  async update(id: string, dto: UpdateServerDto): Promise<Server> {
    await this.findOne(id);
    return this.prisma.server.update({ where: { id }, data: dto });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.server.delete({ where: { id } });
  }
}