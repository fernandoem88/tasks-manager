import { MEDIA, type Breakpoint } from "@/theme";
import styled, { css } from "styled-components";

interface CardProps {
  width: string | Partial<Record<Breakpoint, string>>;
}

export const CarouselRoot = styled.div<{ gap?: string }>`
  display: block;
  white-space: nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  border: solid 1px red;
  & > *:not(:first-of-type) {
    margin-left: ${(p) => p.gap || "0px"};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const getWidth = (width: CardProps["width"]) => {
  if (typeof width === "string") {
    return `width: ${width}`;
  }

  const mediaUp = (breakPoint: Breakpoint) => {
    const value = width[breakPoint];
    if (value === undefined) return "";
    return MEDIA.up(breakPoint)`width: ${value};`;
  };

  return css`
    ${mediaUp("xs")}
    ${mediaUp("sm")}
    ${mediaUp("md")}
    ${mediaUp("lg")}
    ${mediaUp("xl")}
    ${mediaUp("xxl")}
  `;
};

export const CarouselCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "width",
})<CardProps>`
  ${({ width }) => getWidth(width)};
  display: inline-block;
  scroll-snap-align: start;
  padding: 10px;
  background: white;
  box-sizing: border-box;
  flex-grow: 1;
  height: 100%;
  border: solid 1px;
`;
