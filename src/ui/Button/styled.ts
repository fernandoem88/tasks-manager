import { FONT_SIZES, PALETTE } from "@/ui/theme";
import styled, { css } from "styled-components";

type Color = "primary" | "secondary" | "warning";
type Variant = "contained" | "outlined";

export interface ButtonRootProps {
  color?: Color;
  variant?: Variant;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  noElevation?: boolean;
}

const BUTTON_SIZES = {
  sm: FONT_SIZES.body2,
  md: FONT_SIZES.body1,
  lg: FONT_SIZES.h6,
};

const getStyle = ({ color, variant }: ButtonRootProps) => {
  if (variant === "contained") {
    return css`
      border-color: none !important;
      color: ${color ? "white" : "#777"};
      background: ${color ? PALETTE[color].main : PALETTE.grey["300"]};
    `;
  }

  return css`
    border: solid 1px ${color ? PALETTE[color].main : PALETTE.grey[200]};
  `;
};

export const Root = styled.button.withConfig({
  shouldForwardProp: (prop) => !["rounded", "noElevation"].includes(prop),
})<ButtonRootProps>`
  all: unset;
  outline: none !important;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: ${(p) => (p.rounded ? "4px" : "4px 8px")};
  font-size: ${({ size = "md" }) => BUTTON_SIZES[size]};
  ${(p) =>
    p.rounded &&
    css`
      width: 16px;
      height: 16px;
    `}
  border-radius: ${(p) => (p.rounded ? "50%" : "4px")};
  box-shadow: ${(p) => (p.noElevation ? "none" : "2px 2px 8px #ccc")};
  transition: 0.2s;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  &:active,
  &:disabled {
    box-shadow: none;
  }
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  ${(p) => getStyle(p)}
`;
