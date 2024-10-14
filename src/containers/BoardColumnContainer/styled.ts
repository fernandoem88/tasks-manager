import { PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.section`
  background-color: ${PALETTE.grey[100]};
  border-radius: 8px;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 16px;
`;

export const ColumnHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: solid 1px ${PALETTE.grey[200]};
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
