import type { ReactNode } from "react";
import { Root } from "./styled";

interface Props {
  children: ReactNode;
}

export const UiAlert = ({ children }: Props) => {
  return <Root>{children}</Root>;
};
