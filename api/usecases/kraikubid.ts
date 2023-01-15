import { nameWithOutPrefix } from "./../utils/string";
import { mailService } from "../mail";
import { appConfig } from "./../config/app";
import { sha256 } from "./../utils/crypto";
import { redis } from "../../data/redis";
import { p } from "../../src/utils/path";

class KraikubIDUsecase {
  async verifyEmail(email: string, user: UserWithStudent, lang: string) {
    const vssid = await this.createVerificationSession(email, user.uid);
    const res = await mailService.sendVerificationEmail(email, lang, {
      code: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${p.emailVerification}?vssid=${vssid}`,
      name:
        lang === "th"
          ? nameWithOutPrefix(user.student?.nameTh || "")
          : nameWithOutPrefix(user.student?.nameEn || ""),
    });
    return res;
  }

  async createVerificationSession(email: string, uid: string) {
    const now = Date.now();
    const vssid = sha256(email + uid + now);
    await redis.connect();
    await redis.set(
      `emv:${vssid}`,
      JSON.stringify({
        email: email,
        uid: uid,
        status: false,
      }),
      appConfig.expirations.verificationEmail.s
    );
    return vssid;
  }
}

export const kraikubIdUsecase = new KraikubIDUsecase();
