import { PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.div`
  width: 100%;
  height: 100%;
  max-width: 980px;
  margin: auto;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 12px;
  padding-top: 0;
  overflow: hidden;
`;

export const BoardContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  border: solid 1px ${PALETTE.grey[200]};
  border-radius: 8px;
  padding: 4px;
  overflow-y: hidden;
`;
