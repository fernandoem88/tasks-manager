import styled, { css } from "styled-components";

export const Root = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "isTextArea",
})<{ isTextArea?: boolean }>`
  padding: 4px 8px;
  ${(p) =>
    p.isTextArea
      ? css`
          height: 72px;
        `
      : ""}
`;
