import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ProjectsRequest {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsNumber()
  zip_code!: number;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsDate()
  deadline!: Date;

  @IsNotEmpty()
  @IsBoolean()
  done!: boolean;

  @IsNotEmpty()
  @IsNumber()
  cost!: number;
}
