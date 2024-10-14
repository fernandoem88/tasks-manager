import { PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.section`
  background-color: ${PALETTE.grey[100]};
  border-radius: 8px;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 4px;
`;

export const ColumnHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: solid 1px ${PALETTE.grey[200]};
  position: sticky;
  top: 0;
  background-color: ${PALETTE.grey[100]};
  backdrop-filter: blur(3px);
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
`;
