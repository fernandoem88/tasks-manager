import styled from "styled-components";

export const Root = styled.article`
  background-color: white;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
  box-shadow: 1px 1px 2px #0002;
`;

export const TaskHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
