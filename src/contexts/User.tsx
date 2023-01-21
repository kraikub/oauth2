import { Progress } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useOnClient } from "../hooks/on-client";
import { userService } from "../services/userService";
import { getSigninUrl } from "../utils/path";

interface UserProviderProps {
  children?: any;
  user: UserVariant | null;
}

interface UserContext {
  user: UserVariant | null;
  signout: () => void;
  isLoading: boolean;
}

const defaultUserContextValue = {
  user: null,
  signout: () => {},
  isLoading: false,
};

export const userContext = createContext<UserContext>(defaultUserContextValue);

export const UserProvider: FC<UserProviderProps> = ({ children, user }) => {
  const router = useRouter();
  const ready = useOnClient();

  const [isLoading, setIsLoading] = useState(false);

  const signout = async () => {
    setIsLoading(true);
    await userService.signout();
    setIsLoading(false);
    router.push(getSigninUrl({}));
  };

  if (!ready) {
    return null;
  }
  if (!user) {
    router.push(getSigninUrl({}));
    return null;
  }

  return (
    <userContext.Provider
      value={{
        user,
        isLoading,
        signout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
