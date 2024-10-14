import { PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const AppRoot = styled.main`
  height: 100vh;
  overflow: auto;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const AppHeader = styled.header`
  height: 48px;
  border-bottom: solid 1px ${PALETTE.grey["300"]};
  position: sticky;
  top: 0;
  background-color: white;
  backdrop-filter: blur(3px);
`;

export const AppContent = styled.section`
  height: 100%;
`;
