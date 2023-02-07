import { Injectable } from '@nestjs/common';
import { PrismaConfig } from '@config/prisma/prisma.client';
import { Projects, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsRepository {
  constructor(private prisma: PrismaConfig) {}

  async project(
    ProjectsWhereUniqueInput: Prisma.ProjectsWhereUniqueInput,
  ): Promise<Projects | null> {
    return this.prisma.projects.findUnique({
      where: ProjectsWhereUniqueInput,
    });
  }

  async projectsUser(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectsWhereUniqueInput;
    where?: string;
    orderBy?: Prisma.ProjectsOrderByWithRelationInput;
  }): Promise<Projects[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projects.findMany({
      skip,
      take,
      cursor,
      where: { username: where },
      orderBy,
    });
  }

  async createProjects(data: Prisma.ProjectsCreateInput): Promise<Projects> {
    return await this.prisma.projects.create({
      data,
    });
  }

  async updateProject(
    where: Prisma.ProjectsWhereUniqueInput,
    data: Prisma.ProjectsUpdateInput,
  ): Promise<Projects> {
    return this.prisma.projects.update({
      data,
      where,
    });
  }

  async deleteProject(
    where: Prisma.ProjectsWhereUniqueInput,
  ): Promise<Projects> {
    return this.prisma.projects.delete({
      where,
    });
  }
}
