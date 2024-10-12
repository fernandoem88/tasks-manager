import type { ReactNode } from "react";
import { Root, Primary } from "./styled";

interface Props {
  onClick?: (e: any) => void;
  children: ReactNode;
  divider?: boolean;
  as?: "div" | "a" | "p" | "span";
}

export const UiListItem = ({ children, divider, as, onClick }: Props) => {
  return (
    <Root as={as} divider={divider} onClick={onClick}>
      <Primary>{children}</Primary>
    </Root>
  );
};
