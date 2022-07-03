import jwt from "jsonwebtoken";
import { AuthenticationObject } from "../api/types/auth.response";
import { AnyStudentScope } from "../scopes/student";

export const signAuthObject = (data: AuthenticationObject): string => {
  if (!process.env.JWT_SECRET) {
    console.error("Cannot sign the message without secret.");
    process.exit(1);
  }
  return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1m" });
};

export const verify = (token: string): [boolean, any, unknown | null] => {
  try {
    const p = jwt.verify(token, process.env.JWT_SECRET as string);
    return [true, p, null];
  } catch (error) {
    return [false, null, error];
  }
};
