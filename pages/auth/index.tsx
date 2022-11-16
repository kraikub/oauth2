import * as crypto from "crypto";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { sha256 } from "../../api/utils/crypto";
import { getSigninUrl } from "../../src/utils/path";

export default function AuthRandomizer() {
  const router = useRouter();
  useEffect(() => {
    const rnd = crypto.randomBytes(30).toString("hex");
    localStorage.setItem("code_verifier", rnd);
    const codeChallenge = sha256(rnd);
    router.push(
      getSigninUrl({
        codeChallenge: codeChallenge,
        codeChallengeMethod: "SHA256"
      })
    );
  }, []);
  return null;
}
