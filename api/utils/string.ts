export const nameWithOutPrefix = (n: string) => {
  return n.split(" ").slice(1).join(" ");
}

export const checkRedisTopic = (key: string, valueToCheck: string) => {
  return key.split(":")[0] === valueToCheck;
}