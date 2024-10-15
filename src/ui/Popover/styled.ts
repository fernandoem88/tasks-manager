import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.025);
  z-index: 100;
`;

export const PopoverRoot = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: ${(p) => p.$top}px;
  left: ${(p) => p.$left}px;
  background-color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 1000;
  overflow: hidden;
`;
