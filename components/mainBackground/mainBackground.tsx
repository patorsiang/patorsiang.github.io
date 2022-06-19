import React from "react";
import { Background, Bubble } from "./mainBackground.style";

export const MainBackground = ({ children }: { children: JSX.Element }) => {
  return (
    <Background>
      <div className="bubbles">
        {Array.from(Array(30), (_, i) => (
          <Bubble className="bubble" key={i} />
        ))}
      </div>
      {children}
    </Background>
  );
};
