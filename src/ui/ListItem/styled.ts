import { FONT_SIZES, PALETTE } from "@/ui/theme";
import styled, { css } from "styled-components";

export const Root = styled.div<{ $divider?: boolean; $isSelected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: ${(p) => (p.$isSelected ? PALETTE.primary.main : "#444")};
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${PALETTE.primary.main}15;
  }

  ${(p) => {
    if (!p.$divider) return "";
    return css`
      border-bottom: solid 1px ${PALETTE.grey["200"]};
    `;
  }}
`;

export const Primary = styled.div`
  flex-grow: 1;
  font-size: ${FONT_SIZES.body1};
`;
