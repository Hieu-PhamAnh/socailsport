import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(@Body() user: any) {
    return this.userService.create(user);
  }

  @Get('profile/:id')
  async getUser(@Param('id') id: string): Promise<Partial<User> & any> {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user id');
  }
}
