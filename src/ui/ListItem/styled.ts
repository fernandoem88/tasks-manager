import { FONT_SIZES, PALETTE } from "@/theme";
import styled, { css } from "styled-components";

export const Root = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "divider",
})<{ divider?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${PALETTE.grey["200"]};
  }

  ${(p) => {
    if (!p.divider) return "";
    return css`
      border-bottom: solid 1px ${PALETTE.grey["200"]};
    `;
  }}
`;

export const Primary = styled.div`
  flex-grow: 1;
  font-size: ${FONT_SIZES.body2};
`;
