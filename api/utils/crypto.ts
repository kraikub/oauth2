import * as crypto from "crypto";

export const createAnonymousIdentity = (
  uid: string,
  clientId: string
): string => {
  if (!process.env.IDENTITY_SECRET) {
    throw new Error("require process.env.IDENTITY_SECRET");
  }
  const s = process.env.IDENTITY_SECRET as string;
  const p = Number(`0x${s.slice(s.length - 31, s.length - 9)}`);
  const sal = p % 456835326;
  return crypto
    .createHash("sha256")
    .update(`${uid}${sal}${s}${clientId}.`)
    .digest("hex");
};

export const calculateUid = (stdId: string, stdCode: string) =>
  crypto
    .createHash("sha256")
    .update(stdId + stdCode)
    .digest("hex");

export const sha256 = (payload: string) => {
  return crypto.createHash("sha256").update(payload).digest("hex");
};

export const calculateAcademicHash = (uid: string, year: string) => {
  return sha256(uid + year);
};

export const random = (length: number) => {
  return crypto.randomBytes(length).toString("hex");
}


export const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

export const makeid = (length: number) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
