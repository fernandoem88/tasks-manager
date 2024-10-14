import { FONT_SIZES, PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const AppRoot = styled.main`
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
`;

export const AppHeader = styled.header`
  display: flex;
  align-items: center;
  height: 48px;
  border-bottom: solid 1px ${PALETTE.grey["300"]};
  position: sticky;
  top: 0;
  background-color: white;
  backdrop-filter: blur(3px);
  background-color: ${PALETTE.primary.main};
  color: white;
  font-size: ${FONT_SIZES.h6};
  padding: 0 16px;
`;

export const AppContent = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
`;
