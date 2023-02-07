import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequest {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;
}
