import { useEffect, useRef, useState } from "react";

export const useCarousel = <Element extends HTMLElement = HTMLDivElement>(
  carouselId?: string
) => {
  const [index, setIndex] = useState(0);
  const anchorRef = useRef<Element | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [canScrollToEnd, setCanScrollToEnd] = useState(false);

  useEffect(() => {
    if (!anchorRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = anchorRef.current;
    const hasRoomToScroll = scrollLeft + clientWidth < scrollWidth;
    setCanScrollToEnd(hasRoomToScroll);
  }, [carouselId, index]);

  useEffect(() => {
    if (!anchorRef.current) return;

    const element = anchorRef.current;

    const updateItems = () => {
      setTotalItems(element?.children.length ?? 0);
    };

    updateItems();

    const observer = new MutationObserver(() => updateItems());
    observer.observe(element, { childList: true });

    return () => observer.disconnect();
  }, [carouselId]);

  const scrollTo = (index: number) => {
    const child = anchorRef.current?.children[index] as HTMLDivElement;
    const { offsetLeft = 0 } = child ?? {};
    anchorRef.current?.scrollTo({ left: offsetLeft, behavior: "smooth" });
  };

  const handleNext = () => {
    const nextIndex = Math.min(index + 1, totalItems - 1);
    scrollTo(nextIndex);
    setIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = Math.max(index - 1, 0);
    scrollTo(previousIndex);
    setIndex(previousIndex);
  };

  const maxIndex = Math.max(0, totalItems - 1);
  const isPreviousDisabled = index <= 0;
  const isNextDisabled = !canScrollToEnd || index >= maxIndex;

  return {
    anchorRef,
    totalItems,
    canScrollToEnd,
    index,
    isPreviousDisabled,
    isNextDisabled,
    navigation: { next: handleNext, prev: handlePrevious, goTo: scrollTo },
  };
};
