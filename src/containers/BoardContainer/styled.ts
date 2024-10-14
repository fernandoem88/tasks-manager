import { PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.div`
  max-width: 980px;
  margin: auto;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`;

export const BoardContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  border: solid 1px ${PALETTE.grey[200]};
  border-radius: 8px;
`;
