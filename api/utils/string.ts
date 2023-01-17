export const nameWithOutPrefix = (n: string) => {
  return n.split(" ").slice(1).join(" ");
};

export const checkRedisTopic = (key: string, valueToCheck: string) => {
  return key.split(":")[0] === valueToCheck;
};

export const testOrgUsername = (orgUsername: string) => {
  return /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/.test(
    orgUsername
  );
};

export const concatFullName = (
  title: string,
  firstName: string,
  middleName: string,
  lastName: string
) => {
  const res = [];
  if (title) {
    res.push(title);
  }
  if (firstName) {
    res.push(firstName);
  }
  if (middleName) {
    res.push(middleName);
  }
  if (lastName) {
    res.push(lastName);
  }
  return res.join(" ");
};

export const createUsername = (firstName: string, lastName: string) => {
  return firstName.toLowerCase()+"."+lastName.toLowerCase().slice(0,3);
};
