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
      <UiButton rounded onClick={onPrevious} disabled={isPreviousDisabled}>
        &larr;
      </UiButton>

      <UiButton rounded onClick={onNext} disabled={isNextDisabled}>
        &rarr;
      </UiButton>
    </Root>
  );
};
