import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/users.repository';
import { UserRequest } from 'src/models/requests/user.request';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: UserRequest) {
    try {
      await this.userRepository.createUser(data);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User Created',
      };
    } catch (error) {
      throw new HttpException('Error inserting user', HttpStatus.BAD_REQUEST);
    }
  }

  async getOne(username: string) {
    return await this.userRepository.user(username);
  }
}
