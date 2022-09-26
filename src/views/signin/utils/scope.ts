export const validScope = ["0", "1", "2"];
export const isValideScope = (s: string) => {
  return validScope.includes(s);
}