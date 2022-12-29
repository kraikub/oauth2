export const nameWithOutPrefix = (n: string) => {
  return n.split(" ").slice(1).join(" ");
}