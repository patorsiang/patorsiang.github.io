import React from "react";
import { Background } from "./mainBackground.style";

export const MainBackground = ({ children }: { children: JSX.Element }) => {
  return <Background>{children}</Background>;
};
