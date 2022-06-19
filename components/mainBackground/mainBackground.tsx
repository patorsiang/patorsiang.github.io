import React from "react";
import { useRouter } from "next/router";
import { Background, Bubble, Bubbles } from "./mainBackground.style";

export const MainBackground = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  return (
    <Background>
      <Bubbles hidden={router.asPath !== "/"}>
        {Array.from(Array(30), (_, i) => (
          <Bubble className="bubble" key={i} />
        ))}
      </Bubbles>
      {children}
    </Background>
  );
};
