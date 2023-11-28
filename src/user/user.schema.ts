import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GENDER } from 'constants/user.constants';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  gender: GENDER;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: null })
  birthday: Date;

  @Prop({ default: new Date() })
  joinedAt: Date;

  @Prop({ default: '' })
  bio: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  incomingFriendRequests: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
