import { StudentModel } from "../../data/models/student";
import { mongodb } from "../../data/mongo";

interface StudentFilter {
  uid?: string;
  stdId?: string;
}

class StudentRepository {
  findOne = async (filter: StudentFilter) => {
    await mongodb.connect();
    return StudentModel.findOne<Student>(filter);
  };
  create = async (s: Student) => {
    await StudentModel.create<Student>(s);
    return s;
  }
}
export const studentRepository = new StudentRepository();
