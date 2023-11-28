import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel({ ...user, joinedAt: new Date() });
    return createdUser.save();
  }
}
