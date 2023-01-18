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

export const concatFullName = (firstName: string, lastName: string) => {
  const res = [];
  if (firstName) {
    res.push(firstName);
  }
  if (lastName) {
    res.push(lastName);
  }
  return res.join(" ");
};

export const createUsername = (
  firstName: string,
  lastName: string,
  i: number,
  min: number = 3
) => {
  const first = firstName.toLowerCase();
  const last =
    lastName.length >= i
      ? lastName.toLowerCase().slice(0, i)
      : lastName.toLowerCase() + `${min - i + 1}`;
  return first + "." + last;
};
