import { Progress } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import test from "node:test";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { User } from "../../db/schema/user";
import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { getSigninUrl } from "../utils/path";

interface UserProviderProps {
  children?: any;
}

interface UserContext {
  user?: User;
  reload: () => void;
  accessToken: () => string | null;
}

const defaultUserContextValue = {
  user: undefined,
  reload: () => {},
  accessToken: () => null,
};

export const userContext = createContext<UserContext>(defaultUserContextValue);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const [toggleState, setToggleState] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const reload = () => {
    setToggleState(!toggleState);
  };

  const handleRedirectToSigin = () => {
    const signinUrl = getSigninUrl({
      redirectPath: router.route
    })
    router.push(signinUrl);
  };

  const accessToken = () => {
    return localStorage.getItem("access")
  }

  const getUser = async () => {
    setRender(false);
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");
    if (!accessToken || !refreshToken) return handleRedirectToSigin();
    try {
      const { data } = await userService.get(accessToken);
      if (data.payload === null) {
        return handleRedirectToSigin();
      }
      setUser(data.payload);
      setRender(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return refresh(accessToken, refreshToken);
        }
      } else {
        console.error(error);
      }
    }
  };

  const refresh = async (access: string | null, refresh: string | null) => {
    if (!access || !refresh) return alert("tokens not defined");
    try {
      const { data } = await authService.refresh(access, refresh);
      localStorage.setItem("access", data.payload.accessToken);
      await getUser();
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return handleRedirectToSigin();
        }
      } else {
        console.error(error);
      }
    }
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
        accessToken
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext)
