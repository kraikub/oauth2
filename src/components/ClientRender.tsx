import { FC } from "react";
import { useOnClient } from "../hooks/on-client"

interface ClientRenderProps {
  children?: any;
}

export const ClientRender: FC<ClientRenderProps> = ({ children }) => {
  const ready = useOnClient()
  if (!ready) {
    return null;
  }
  return children;
}