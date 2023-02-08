import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export const useClientTranslation = (dict: Dictionary) => {
  const [cookie] = useCookies(["LANG"]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (cookie.LANG) {
      setReady(true);
    }
  }, []);
  

  const t = (key: string) => {
    return dict[cookie.LANG] ? dict[cookie.LANG][key] : key;
  };
  return {
    t,
    ready,
  };
};
