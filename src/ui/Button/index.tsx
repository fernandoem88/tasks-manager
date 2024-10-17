import { ForwardedRef, forwardRef, type ReactNode } from "react";
import { type ButtonRootProps, Root } from "./styled";

interface Props extends ButtonRootProps {
  noElevation?: boolean;
  children: ReactNode;
  onClick?: (e: any) => void;
  disabled?: boolean;
  title?: string;
}

export const UiButton = forwardRef(function UiButtonWithRef(
  { children, onClick, disabled, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement | null>
) {
  return (
    <Root
      {...props}
      disabled={disabled}
      ref={ref}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </Root>
  );
});
