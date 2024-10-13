"use client";

import { BoardHeader } from "@/components/BoardHeader";
import { useState } from "react";
import { Root, BoardContent } from "./styled";
import { CarouselActions } from "@/components/CarouselActions";
import { useCarousel } from "@/ui/Carousel/hooks/useCarousel";
import { UiCarousel, UiCarouselCard } from "@/ui/Carousel";
import { useAppState } from "@/contexts/AppStateProvider";
import { EmptyBoard } from "@/components/EmptyBoard";
import { UiModalPaper } from "@/ui/ModalPaper";
import { BoardForm } from "@/components/BoardCreatorForm";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";

export const BoardContainer = () => {
  const { boards, columns } = useAppState();
  const [isBoardCreatorOpen, setIsBoardCreatorOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("");
  const { anchorRef, isNextDisabled, isPreviousDisabled, navigation } =
    useCarousel();

  const selectedBoard = boards[selectedId];

  const handleConfirm = (name: string) => {
    const newBoard = dispatch("newBoard", name);
    setIsBoardCreatorOpen(false);
  };

  return (
    <Root>
      {!selectedBoard && (
        <EmptyBoard
          boards={Object.keys(boards)}
          getBoard={(boardId) => boards[boardId]}
          onCreate={() => setIsBoardCreatorOpen(true)}
          onSelect={(boardId) => setSelectedId(boardId)}
        />
      )}
      {!!selectedBoard && (
        <>
          <BoardHeader
            selectedId={selectedId}
            boards={Object.keys(boards)}
            getBoard={(boardId) => boards[boardId]}
            onSelect={setSelectedId}
            onNewBoard={() => setIsBoardCreatorOpen(true)}
          />
          <BoardContent>
            <CarouselActions
              onNext={navigation.next}
              onPrevious={navigation.prev}
              isNextDisabled={isNextDisabled}
              isPreviousDisabled={isPreviousDisabled}
            />
            <UiCarousel gap="12px" ref={anchorRef}>
              {selectedBoard?.columnIds.map((columnId) => {
                const column = columns[columnId];

                if (!column) return null;

                return (
                  <UiCarouselCard
                    key={columnId}
                    width={{ xs: "100%", sm: "75%", md: "240px" }}
                  >
                    <div>{column.name}</div>
                  </UiCarouselCard>
                );
              })}
            </UiCarousel>
          </BoardContent>
        </>
      )}
      <UiModalPaper
        open={isBoardCreatorOpen}
        onClose={() => setIsBoardCreatorOpen(false)}
      >
        <BoardForm onConfirm={handleConfirm} />
      </UiModalPaper>
    </Root>
  );
};
