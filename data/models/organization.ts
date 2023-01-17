import { organizationSchema } from './../schema/organization';
import { model, models } from "mongoose";

export const organizationModel = models["Organization"] ||  model<Organization>('Organization', organizationSchema, 'organizations');