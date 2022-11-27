import { Progress } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import test from "node:test";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { getSigninUrl } from "../utils/path";

interface UserProviderProps {
  children?: any;
}

interface UserContext {
  user?: UserWithStudent;
  reload: () => void;
  signout: () => void;
  accessToken: () => string | null;
}

const defaultUserContextValue = {
  user: undefined,
  reload: () => {},
  signout: () => {},
  accessToken: () => null,
};

export const userContext = createContext<UserContext>(defaultUserContextValue);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const [toggleState, setToggleState] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [user, setUser] = useState<UserWithStudent>();
  const reload = () => {
    setToggleState(!toggleState);
  };

  const handleRedirectToSigin = () => {
    router.push("/auth")
  }

  const accessToken = () => {
    return localStorage.getItem("access");
  };

  const getUser = async () => {
    setRender(false);
    try {
      const { data } = await userService.get();
      if (data.payload === null) {
        return handleRedirectToSigin();
      }
      setUser(data.payload);
      setRender(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return handleRedirectToSigin();
        }
      } else {
        console.error(error);
        return handleRedirectToSigin();
      }
    }
  };

  const signout = async () => {
    await userService.signout();
    reload();
  };


  useEffect(() => {
    getUser();
  }, [toggleState]);

  useEffect(() => {
    getUser();
  }, []);

  if (!render) {
    return <Progress size="xs" isIndeterminate colorScheme="katrade" />;
  }
  return (
    <userContext.Provider
      value={{
        user,
        reload,
        accessToken,
        signout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
