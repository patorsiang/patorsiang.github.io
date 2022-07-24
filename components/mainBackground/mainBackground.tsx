import React from "react";
import { Background, Bubble, Bubbles } from "./mainBackground.style";

export const MainBackground = ({
  children,
  hidden,
}: {
  children: JSX.Element;
  hidden?: boolean;
}) => {
  return (
    <Background>
      <Bubbles hidden={hidden}>
        {Array.from(Array(30), (_, i) => (
          <Bubble className="bubble" key={i} />
        ))}
      </Bubbles>

      {children}
    </Background>
  );
};
