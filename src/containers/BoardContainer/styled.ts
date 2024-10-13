import styled from "styled-components";

export const Root = styled.div`
  max-width: 980px;
  margin: auto;
  height: 100%;
  border: solid 1px;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`;

export const BoardContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`;
