import { EducationModel } from "../../data/models/education";
import { mongodb } from "../../data/mongo";

interface EducationFilter {
  uid?: string;
  stdId?: string;
  stdCode?: string;
  index?: number;
  attenedDate?: string;
  copenId?: string;
}

class EducationRepository {
  findOne = async (filter: EducationFilter) => {
    await mongodb.connect();
    return EducationModel.findOne<Education>(filter);
  };
  create = async (e: Education) => {
    await mongodb.connect();
    await EducationModel.create<Education>(e);
    return e;
  }
  createMany = async (es: Education[]) => {
    await mongodb.connect();
    await EducationModel.insertMany(es);
    return es;
  }
}
export const educationRepository = new EducationRepository();
