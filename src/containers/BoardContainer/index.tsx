import { BoardHeader } from "@/components/BoardHeader";
import { useState } from "react";
import { Root, TasksRoot } from "./styled";
import { Board } from "@/types";
import { CarouselActions } from "@/components/CarouselActions";
import { useCarousel } from "@/ui/Carousel/hooks/useCarousel";
import { UiCarousel, UiCarouselCard } from "@/ui/Carousel";

interface Step {
  id: number;
  name: string;
  tasks: number[];
}

interface AppState {
  boards: Record<number, Board>;
  steps: Record<number, Step>;
}

const appState: AppState = {
  boards: {
    1: { id: 1, name: "Board 1", steps: [1, 2] },
    2: { id: 2, name: "Board 2", steps: [] },
  },
  steps: {
    1: { id: 1, name: "Todo", tasks: [] },
    2: { id: 2, name: "Doing", tasks: [] },
  },
};

export const BoardContainer = () => {
  const [selectedId, setSelectedId] = useState(0);
  const { anchorRef, isNextDisabled, isPreviousDisabled, navigation } =
    useCarousel();

  const selectedBoard = appState.boards[selectedId];
  return (
    <Root>
      <BoardHeader
        selectedId={selectedId}
        boards={Object.keys(appState.boards)}
        getBoard={(boardId) => appState.boards[boardId]}
        onSelect={setSelectedId}
      />
      <TasksRoot>
        <CarouselActions
          onNext={navigation.next}
          onPrevious={navigation.prev}
          isNextDisabled={isNextDisabled}
          isPreviousDisabled={isPreviousDisabled}
        />
        <UiCarousel gap="12px">
          {selectedBoard?.steps.map((stepId) => {
            const step = appState.steps[stepId];

            if (!step) return null;

            return (
              <UiCarouselCard
                key={stepId}
                width={{ xs: "100%", sm: "75%", md: "240px" }}
              >
                <div>{step.name}</div>
              </UiCarouselCard>
            );
          })}
        </UiCarousel>
      </TasksRoot>
    </Root>
  );
};
