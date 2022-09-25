import { model, models } from "mongoose";
import { userSchema } from "../schema/user";

export const UserModel = models["User"] ||  model<User>('User', userSchema, 'users');