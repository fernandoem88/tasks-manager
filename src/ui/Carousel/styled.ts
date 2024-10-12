import { media, type Breakpoint } from "@/theme";
import styled from "styled-components";

interface CardProps {
  width: number | Partial<Record<Breakpoint, number>>;
}

export const CarouselRoot = styled.div`
  display: block;
  white-space: nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  border: solid 1px red;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const getWidth = (width: CardProps["width"]) => {
  if (typeof width === "number") {
    return `${width}px`;
  }

  return Object.entries(width)
    .map((entry) => {
      const [key, value] = entry;
      return media.up(key as Breakpoint)`width: ${value}px;`;
    })
    .join("\n");
};

export const CarouselCard = styled.div<CardProps>`
  ${({ width }) => getWidth(width)};
  display: inline-block;
  scroll-snap-align: start;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  flex-grow: 1;
`;
