import { FONT_SIZES, PALETTE } from "@/theme";
import styled, { css } from "styled-components";

type Color = "primary" | "secondary" | "warning";
type Variant = "contained" | "outlined";

export interface ButtonRootProps {
  color?: Color;
  variant?: Variant;
  rounded?: boolean;
  size?: "sm" | "md";
}

const getStyle = ({ color, variant }: ButtonRootProps) => {
  if (variant === "contained") {
    return css`
      border-color: none !important;
      color: ${color ? "white" : "#777"};
      background: ${color ? PALETTE[color].main : PALETTE.grey["300"]};
    `;
  }

  return css`
    border: solid 1px ${color ? PALETTE[color].main : undefined};
  `;
};

export const Root = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "rounded",
})<ButtonRootProps>`
  all: unset;
  outline: none !important;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: ${(p) => (p.rounded ? "4px" : "4px 8px")};
  font-size: ${(p) =>
    p.size === "sm" ? FONT_SIZES.caption : FONT_SIZES.body2};
  border-radius: ${(p) => (p.rounded ? "50%" : "4px")};
  box-shadow: 2px 2px 8px #ccc;
  transition: 0.2s;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
  &:hover {
    transform: translateY(-1px);
  }
  ${(p) => getStyle(p)}
`;
