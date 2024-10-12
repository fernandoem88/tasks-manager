import React from "react";
import { Root } from "./styled";

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
      <button onClick={onPrevious} disabled={isPreviousDisabled}>
        &larr; Prev
      </button>

      <button onClick={onNext} disabled={isNextDisabled}>
        Next &rarr;
      </button>
    </Root>
  );
};
