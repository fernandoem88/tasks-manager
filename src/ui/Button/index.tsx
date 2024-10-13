import { ForwardedRef, forwardRef, type ReactNode } from "react";
import { type ButtonRootProps, Root } from "./styled";

interface Props extends ButtonRootProps {
  children: ReactNode;
  onClick?: (e: any) => void;
  disabled?: boolean;
}

export const UiButton = forwardRef(
  (
    { children, onClick, disabled, ...props }: Props,
    ref: ForwardedRef<any>
  ) => {
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
  }
);
