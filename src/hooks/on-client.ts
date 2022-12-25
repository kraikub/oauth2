import { useState } from "react";
import { useEffect } from "react";
export const useOnClient = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
};
