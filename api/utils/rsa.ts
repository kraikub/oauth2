import * as crypto from "crypto";
import { MYKU_RSA_PUBLIC_KEY } from "../constants/rsa";

export const RSAEncryptionForMyKU = (payload: string) => {
  return crypto
    .publicEncrypt(
      {
        key: MYKU_RSA_PUBLIC_KEY,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(payload)
    )
    .toString("base64");
};
