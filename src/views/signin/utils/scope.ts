export const validScope = [
  "0",
  "1",
  "2",
  "openid",
  "university_email",
  "personal_email",
  "student",
  "educations",
  "profile_pic",
];
export const isValideScope = (s: string) => {
  const ssplitted = s.split(" ");
  for (const each of ssplitted) {
    if (!validScope.includes(each)) {
      return false;
    }
  }
  return true;
};
