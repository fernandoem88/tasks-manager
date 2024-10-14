import { PALETTE } from "@/ui/theme";
import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  width: 100%;
  margin: auto;
  padding: 16px;
  gap: 32px;
  padding: 16px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${PALETTE.grey["200"]};
`;

export const List = styled.ul`
  width: 100%;
`;
