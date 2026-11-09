import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateServerDto } from './dto/create-server.dto';
import { QueryServerDto } from './dto/query-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ServersService } from './servers.service';

@ApiTags('servers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get()
  @Roles(Role.Admin, Role.DevOps, Role.Viewer)
  @ApiOperation({ summary: 'List servers with pagination and filters' })
  @ApiOkResponse({ description: 'Paginated server results' })
  findAll(@Query() query: QueryServerDto) {
    return this.serversService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.DevOps, Role.Viewer)
  @ApiOperation({ summary: 'Get a server by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Server details' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serversService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin, Role.DevOps)
  @ApiOperation({ summary: 'Create a server' })
  @ApiCreatedResponse({ description: 'Server created' })
  create(@Body() dto: CreateServerDto) {
    return this.serversService.create(dto);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.DevOps)
  @ApiOperation({ summary: 'Update a server' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Server updated' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateServerDto,
  ) {
    return this.serversService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a server' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Server deleted' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.serversService.remove(id);
  }
}