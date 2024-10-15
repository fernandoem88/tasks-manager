import type { ReactNode } from "react";
import { Root, Primary } from "./styled";

interface Props {
  onClick?: (e: any) => void;
  children: ReactNode;
  divider?: boolean;
  isSelected?: boolean;
  as?: "div" | "a" | "p" | "span";
}

export const UiListItem = ({
  children,
  isSelected,
  divider,
  as,
  onClick,
}: Props) => {
  return (
    <Root as={as} $divider={divider} onClick={onClick} $isSelected={isSelected}>
      <Primary>{children}</Primary>
    </Root>
  );
};
