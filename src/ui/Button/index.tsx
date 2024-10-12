import { ForwardedRef, forwardRef, type ReactNode } from "react";
import { type ButtonRootProps, Root } from "./styled";

interface Props extends ButtonRootProps {
  children: ReactNode;
  onClick?: (e: any) => void;
}

export const UiButton = forwardRef(
  ({ children, ...props }: Props, ref: ForwardedRef<any>) => {
    return (
      <Root {...props} ref={ref}>
        {children}
      </Root>
    );
  }
);
