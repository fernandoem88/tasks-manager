import { FONT_SIZES } from "@/theme";
import styled from "styled-components";

export const Root = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BoardName = styled.h1`
  font-size: ${FONT_SIZES.h1};
`;
