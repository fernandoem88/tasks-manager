import { ReactNode } from "react";
import { Root } from "./styled";

interface Props {
  children?: ReactNode;
}

export const UiModalContent = ({ children }: Props) => {
  return <Root>{children}</Root>;
};
