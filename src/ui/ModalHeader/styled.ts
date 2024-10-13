import { FONT_SIZES, PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  border-bottom: solid 1px ${PALETTE.grey[200]};
  background-color: white;
  z-index: 1;
  padding: 16px;
`;

export const Headline = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: calc(100% - 40px);
`;

export const Title = styled.h6`
  font-size: ${FONT_SIZES.h6}px;
  white-space: pre-wrap;
`;

export const SubTitle = styled.span`
  font-size: ${FONT_SIZES.caption};
  display: block;
  white-space: pre-wrap;
`;
