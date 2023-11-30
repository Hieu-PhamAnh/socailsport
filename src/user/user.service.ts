import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel({ ...user, joinedAt: new Date() });
    return createdUser.save();
  }

  find(
    filter: FilterQuery<User>,
    returnFields?: string[],
    queryOptions?: QueryOptions,
  ): Promise<User[]> {
    return this.userModel.find(filter, returnFields, queryOptions).exec();
  }

  findOne(
    filter: FilterQuery<User>,
    returnFields?: string[],
    queryOptions?: QueryOptions,
  ): Promise<User> {
    return this.userModel.findOne(filter, returnFields, queryOptions).exec();
  }

  async getUserFriends(
    filter: FilterQuery<User>,
    returnFields: string[] = ['_id'],
  ): Promise<User[]> {
    const result = await this.userModel
      .findOne(filter, 'friends')
      .populate('friends', returnFields)
      .exec();
    return result.friends;
  }
}
