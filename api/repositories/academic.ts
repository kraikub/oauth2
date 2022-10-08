import { AcademicModel } from "../../data/models/academic";
import { mongodb } from "../../data/mongo";


class AcademicRepository {
  createMany = async (as: Academic[]) => {
    await mongodb.connect();
    await AcademicModel.insertMany(as)
    return as;
  }
  useAggregationPipeline = async (pipeline: any[]) => {
    await mongodb.connect();
    return await AcademicModel.aggregate(pipeline);
  };
}
export const academicRepository = new AcademicRepository();
