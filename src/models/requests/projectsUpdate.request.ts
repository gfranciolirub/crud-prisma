import { PickType } from '@nestjs/swagger';
import { ProjectsRequest } from './projects.request';

export class ProjectsRequestUpdate extends PickType(ProjectsRequest, [
  'title',
  'zip_code',
  'cost',
  'deadline',
  'username',
] as const) {}
