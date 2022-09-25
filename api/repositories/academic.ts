import { AcademicModel } from "../../data/models/academic";
import { mongodb } from "../../data/mongo";


class AcademicRepository {
  createMany = async (as: Academic[]) => {
    await mongodb.connect();
    await AcademicModel.insertMany(as)
    return as;
  }
}
export const academicRepository = new AcademicRepository();
