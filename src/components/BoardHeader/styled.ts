import { FONT_SIZES } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const BoardName = styled.h1`
  font-size: ${FONT_SIZES.h1};
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
`;
