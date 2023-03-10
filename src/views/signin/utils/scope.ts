export const validScope = [
  "provider",
  "openid",
  "email",
  "fullname",
  "account_type",
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
