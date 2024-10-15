import { PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 16px;
  margin-top: "auto";
  position: sticky;
  bottom: 0;
  background-color: white;
  border-top: solid 1px ${PALETTE.grey[200]};
  z-index: 1;
  grid-area: modal-footer;
`;
