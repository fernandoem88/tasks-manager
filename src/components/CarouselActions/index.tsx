import React from "react";
import { Root } from "./styled";
import { UiButton } from "@/ui/Button";

interface Props {
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export const CarouselActions = ({
  onNext,
  onPrevious,
  isNextDisabled,
  isPreviousDisabled,
}: Props) => {
  return (
    <Root>
      <UiButton onClick={onPrevious} disabled={isPreviousDisabled}>
        &larr; Prev
      </UiButton>

      <UiButton onClick={onNext} disabled={isNextDisabled}>
        Next &rarr;
      </UiButton>
    </Root>
  );
};
