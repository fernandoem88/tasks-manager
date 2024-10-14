import styled from "styled-components";
import { FONT_SIZES } from "../theme";

export type Variant = keyof typeof FONT_SIZES;

const getLineHeight = (variant: Variant = "body1") => {
  switch (variant) {
    case "h1":
      return 1.6;
    case "h2":
    case "h6":
      return 1.4;

    default:
      return 1.2;
  }
};

export const Root = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: Variant }>`
  color: ${(p) => p.color ?? "#444"};
  white-space: pre-wrap;
  font-size: ${({ variant = "body1" }) => FONT_SIZES[variant]};
  line-height: ${(p) => getLineHeight(p.variant)};
`;
