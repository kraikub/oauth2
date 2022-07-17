export const mapQueryStringToUrl = (
  base: string,
  query: { [key: string]: string | undefined }
): string => {
  let baseString = base + "?";
  const keys = Object.keys(query);
  for (const key of keys) {
    if (query[key] === undefined) {
      continue;
    }
    baseString += `${key}=${query[key]}&`;
  }
  return baseString;
};
