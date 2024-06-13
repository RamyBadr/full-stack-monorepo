import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enums/role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Object.values(Role), default: Role.Regular })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
