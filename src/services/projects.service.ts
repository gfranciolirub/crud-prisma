import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Projects } from '@prisma/client';
import { ProjectsRepository } from '@repositories/projects.repository';
import { VIACEP_URL } from '@settings';
import axios, { Axios } from 'axios';
import { ProjectsRequest } from 'src/models/requests/projects.request';
import { ProjectsRequestUpdate } from 'src/models/requests/projectsUpdate.request';
import { GeneralResponse } from 'src/models/responses/general.response';
import { UserService } from './user.service';

@Injectable()
export class ProjectsService {
  constructor(
    private projectsRepository: ProjectsRepository,
    private userService: UserService,
    private axios: Axios,
  ) {}

  async create(data: ProjectsRequest) {
    try {
      const user = await this.userService.getOne(data.username);
      if (!user) throw new Error('User doesnt exists');
      data.deadline = new Date(data.deadline);
      await this.projectsRepository.createProjects({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Project Created',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error inserting project',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async get(username: string): Promise<Projects[]> {
    return this.projectsRepository.projectsUser({ where: username });
  }

  async getProjects(id: number): Promise<Projects> {
    try {
      const project = await this.projectsRepository.project({ id });
      if (project) {
        const res = await axios.get(`${VIACEP_URL}/${project.zip_code}/json/`);
        project['Cidade/UF'] = `${res.data.localidade}/${res.data.uf}`;
        delete project.zip_code;
      }
      return project;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error showing project', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProject(
    data: { id: string },
    body: ProjectsRequestUpdate,
  ): Promise<GeneralResponse> {
    try {
      if (body.deadline) body.deadline = new Date(body.deadline);
      const project = await this.projectsRepository.project({
        id: parseInt(data.id),
      });
      if (!project) throw new Error('Project doesnt exists');
      if (project.username == body.username) {
        await this.projectsRepository.updateProject(
          { id: parseInt(data.id) },
          body,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Project updated',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating project', HttpStatus.BAD_REQUEST);
    }
  }

  async confirm(
    data: { id: string },
    body: { username: string },
  ): Promise<GeneralResponse> {
    try {
      const project = await this.projectsRepository.project({
        id: parseInt(data.id),
      });
      if (project.username == body.username) {
        await this.projectsRepository.updateProject(
          { id: parseInt(data.id) },
          { done: true },
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Project updated',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating project', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProject(
    data: { id: string },
    body: { username: string },
  ): Promise<GeneralResponse> {
    try {
      const project = await this.projectsRepository.project({
        id: parseInt(data.id),
      });
      if (project.username == body.username) {
        await this.projectsRepository.deleteProject({ id: parseInt(data.id) });
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Project deleted',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error deleting project', HttpStatus.BAD_REQUEST);
    }
  }
}
