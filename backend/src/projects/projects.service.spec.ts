import { PrismaService } from '../prisma/prisma.service';
import { QueryProjectDto } from './dto/query-project.dto';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: {
    project: {
      findMany: jest.Mock;
      count: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      project: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    service = new ProjectsService(prisma as unknown as PrismaService);
  });

  it('applies filters and pagination and returns metadata', async () => {
    const query: QueryProjectDto = {
      page: 2,
      limit: 5,
      search: 'payments',
      environment: 'production',
      teamId: 'c9bba2e8-df5c-4dd5-946e-531990405c21',
    };
    const projects = [{ id: 'project-1', name: 'Payments API' }];
    prisma.project.findMany.mockResolvedValue(projects);
    prisma.project.count.mockResolvedValue(6);

    const result = await service.findAll(query);

    expect(prisma.project.findMany).toHaveBeenCalledWith({
      where: {
        environment: 'production',
        teamId: query.teamId,
        OR: [
          { name: { contains: 'payments', mode: 'insensitive' } },
          { environment: { contains: 'payments', mode: 'insensitive' } },
        ],
      },
      skip: 5,
      take: 5,
      orderBy: { name: 'asc' },
    });
    expect(prisma.project.count).toHaveBeenCalledWith({
      where: {
        environment: 'production',
        teamId: query.teamId,
        OR: [
          { name: { contains: 'payments', mode: 'insensitive' } },
          { environment: { contains: 'payments', mode: 'insensitive' } },
        ],
      },
    });
    expect(result).toEqual({
      data: projects,
      meta: { page: 2, limit: 5, total: 6, totalPages: 2 },
    });
  });
});