import { UiCarousel } from "@/ui/Carousel";
import { useCarousel } from "@/ui/Carousel/hooks/useCarousel";
import { CarouselCard } from "@/ui/Carousel/styled";
import React from "react";
import { Root } from "./styled";
import { CarouselActions } from "../CarouselActions";

export const CarouselExample = () => {
  const { anchorRef, isNextDisabled, isPreviousDisabled, navigation } =
    useCarousel();

  return (
    <Root>
      <CarouselActions
        onNext={navigation.next}
        onPrevious={navigation.prev}
        isNextDisabled={isNextDisabled}
        isPreviousDisabled={isPreviousDisabled}
      />
      <UiCarousel ref={anchorRef}>
        <CarouselCard width={300}>
          <h3>Card 1</h3>
          <p>This is a responsive card.</p>
        </CarouselCard>
        <CarouselCard width={{ xs: 180, sm: 220, md: 280, lg: 330 }}>
          <h3>Card 2</h3>
          <p>This is another card.</p>
        </CarouselCard>
        <CarouselCard width={250}>
          <h3>Card 3</h3>
          <p>This card has a fixed width.</p>
        </CarouselCard>
        <CarouselCard width={{ xs: 160, sm: 200, md: 240, lg: 300 }}>
          <h3>Card 4</h3>
          <p>Yet another responsive card.</p>
        </CarouselCard>

        <CarouselCard width={{ xs: 160, sm: 200, md: 240, lg: 300 }}>
          <h3>Card 5</h3>
          <p>Yet another responsive card.</p>
        </CarouselCard>

        <CarouselCard width={{ xs: 160, sm: 200, md: 240, lg: 300 }}>
          <h3>Card 6</h3>
          <p>Yet another responsive card.</p>
        </CarouselCard>

        <CarouselCard width={{ xs: 160, sm: 200, md: 240, lg: 300 }}>
          <h3>Card 7</h3>
          <p>Yet another responsive card.</p>
        </CarouselCard>

        <CarouselCard width={{ xs: 160, sm: 200, md: 240, lg: 300 }}>
          <h3>Card 8</h3>
          <p>Yet another responsive card.</p>
        </CarouselCard>
      </UiCarousel>
    </Root>
  );
};
