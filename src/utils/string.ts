export const noWhiteSpace = (s: string) => {
  return s.replaceAll(" ", "-").toLowerCase();
}