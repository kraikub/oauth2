import { roleSchema } from './../schema/role';
import { model, models } from "mongoose";

export const RoleModel = models["Role"] ||  model<Role>('Role', roleSchema, 'roles');