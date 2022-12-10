export const jsonSerialize = (o: any) => {
  return JSON.parse(JSON.stringify(o))
}