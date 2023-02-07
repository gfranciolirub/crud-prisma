import { Module } from '@nestjs/common';
import { AppController } from '@controllers/app.controller';
import { UserController } from '@controllers/user.controller';
import { UserService } from '@services/user.service';
import { UserRepository } from '@repositories/users.repository';
import { ConfigurationModule } from '@config/config.module';
import { ProjectsRepository } from '@repositories/projects.repository';
import { ProjectsService } from '@services/projects.service';
import { ProjectsController } from '@controllers/projects.controller';
import { Axios } from 'axios';

const repositories = [UserRepository, ProjectsRepository];
const services = [UserService, ProjectsService];
const controllers = [AppController, UserController, ProjectsController];

@Module({
  imports: [ConfigurationModule],
  controllers: [...controllers],
  providers: [...services, ...repositories, Axios],
})
export class AppModule {}
