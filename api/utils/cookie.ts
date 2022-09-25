export const jsonCookie = (cookie: string) => {
  const json: {[key: string]: any} = {};
  const cookieList = cookie.replaceAll(" ", "").split(";");
  for (const each of cookieList) {
    let splited = each.split("=");
    let key = splited[0];
    let val = splited[1];
    json[key] = val;
  }
  return json;
};
