import { ReactNode } from "react";
import { Root, Variant } from "./styled";

interface Props {
  variant?: Variant;
  children?: ReactNode;
  as?: "div" | "span" | "a" | "li" | "p";
}

export const UiTypography = ({ as, children, variant }: Props) => {
  if (!children) return null;

  return (
    <Root as={as} variant={variant}>
      {children}
    </Root>
  );
};
