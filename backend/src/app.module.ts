import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ServersModule } from './servers/servers.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProjectsModule, ServersModule],
})
export class AppModule {}
