import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSigninUrl } from "../../src/utils/path";

export default function AuthRandomizer() {
  const router = useRouter();
  // no need to generate code_challenge

  useEffect(() => {
    router.push(getSigninUrl({}));
  }, []);

  return null;
}
