export const noWhiteSpace = (s: string) => {
  return s.replaceAll(" ", "-").toLowerCase();
};

export const usernameWithFixLength = (username: string, length: number) => {
  if (username.length <= length) return username;
  return username.slice(0, length) + "...";
};
