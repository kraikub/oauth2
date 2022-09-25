interface FullUserData extends User {
  student: Student
  educations: Education[]
}

interface UserWithStudent extends User {
  student: Student
}