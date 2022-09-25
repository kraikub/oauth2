import { GradeModel } from "../../data/models/grade";
import { mongodb } from "../../data/mongo";


class GradeRepository {
  createMany = async (gs: Grade[]) => {
    await mongodb.connect();
    await GradeModel.insertMany(gs)
    return gs;
  }
}
export const gradeRepository = new GradeRepository();
