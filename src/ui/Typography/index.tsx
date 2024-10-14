import { ReactNode } from "react";
import { Root, Variant } from "./styled";
import { PALETTE } from "../theme";

interface Props {
  variant?: Variant;
  children?: ReactNode;
  as?: "div" | "span" | "a" | "li" | "p";
  color?: "primary" | "secondary" | "warning";
}

export const UiTypography = ({ as, children, variant, color }: Props) => {
  if (!children) return null;

  const colorValue = color ? PALETTE[color].main : undefined;

  return (
    <Root as={as} variant={variant} color={colorValue}>
      {children}
    </Root>
  );
};
