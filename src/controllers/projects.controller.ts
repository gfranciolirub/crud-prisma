import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Projects } from '@prisma/client';
import { ProjectsService } from '@services/projects.service';
import { AddTokenRequestInterceptor } from 'src/interceptors/tokenRequest.middleware';
import { ProjectsRequest } from 'src/models/requests/projects.request';
import { ProjectsRequestUpdate } from 'src/models/requests/projectsUpdate.request';
import { GeneralResponse } from 'src/models/responses/general.response';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('/project')
  @UseInterceptors(AddTokenRequestInterceptor)
  async entry(@Body() data: ProjectsRequest): Promise<GeneralResponse> {
    return this.projectsService.create(data);
  }

  @Get('/projects')
  @UseInterceptors(AddTokenRequestInterceptor)
  async get(@Body() data: { username: string }): Promise<Projects[]> {
    return this.projectsService.get(data.username);
  }

  @Get('/project')
  @UseInterceptors(AddTokenRequestInterceptor)
  async getProjects(@Query() data: { id: string }): Promise<Projects> {
    return this.projectsService.getProjects(parseInt(data.id));
  }

  @Put('/projects/:id')
  @UseInterceptors(AddTokenRequestInterceptor)
  async update(
    @Param() data: { id: string },
    @Body() body: ProjectsRequestUpdate,
  ): Promise<GeneralResponse> {
    return this.projectsService.updateProject(data, body);
  }

  @Patch('/projects/:id/done')
  @UseInterceptors(AddTokenRequestInterceptor)
  async confirm(
    @Param() data: { id: string },
    @Body() body: { username: string },
  ): Promise<GeneralResponse> {
    return this.projectsService.confirm(data, body);
  }

  @Delete('/projects/:id')
  @UseInterceptors(AddTokenRequestInterceptor)
  async delete(
    @Param() data: { id: string },
    @Body() body: { username: string },
  ): Promise<GeneralResponse> {
    return this.projectsService.deleteProject(data, body);
  }
}
