"use client";

import { BoardHeader } from "@/components/BoardHeader";
import { useState } from "react";
import { Root, BoardContent } from "./styled";
import { useCarousel } from "@/ui/Carousel/hooks/useCarousel";
import { UiCarousel } from "@/ui/Carousel";
import { useAppState } from "@/contexts/AppStateProvider";
import { EmptyBoard } from "@/components/EmptyBoard";
import { UiModalPaper } from "@/ui/ModalPaper";
import { BoardForm } from "@/components/BoardCreatorForm";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { BoardColumnContainer } from "../BoardColumnContainer";
import { ColumnForm } from "@/components/ColumnForm";

export const BoardContainer = () => {
  const { boards } = useAppState();
  const [isBoardCreatorOpen, setIsBoardCreatorOpen] = useState(false);
  const [isColumnCreatorOpen, setIsColumnCreatorOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("");
  const { anchorRef, isNextDisabled, isPreviousDisabled, navigation } =
    useCarousel();

  const selectedBoard = boards[selectedId];

  const handleCreateBoard = (name: string) => {
    const newState = dispatch("newBoard", name);

    setIsBoardCreatorOpen(false);

    const boardIds = Object.keys(newState?.boards ?? {});
    const isFirstBoard = boardIds.length === 1;

    if (!isFirstBoard) return;

    setSelectedId(boardIds[0]);
  };

  const handleCreateColumn = (name: string) => {
    if (!selectedBoard) return;
    dispatch("newBoardColumn", { boardId: selectedId, columnName: name });
    setIsColumnCreatorOpen(false);
  };

  return (
    <Root>
      {!selectedBoard && (
        <EmptyBoard onCreate={() => setIsBoardCreatorOpen(true)} />
      )}

      {!!selectedBoard && (
        <>
          <BoardHeader
            selectedId={selectedId}
            boards={Object.keys(boards)}
            getBoard={(boardId) => boards[boardId]}
            onSelect={setSelectedId}
            onNewBoard={() => setIsBoardCreatorOpen(true)}
            onNewColumn={() => setIsColumnCreatorOpen(true)}
          />
          <BoardContent>
            {/* <CarouselActions
              onNext={navigation.next}
              onPrevious={navigation.prev}
              isNextDisabled={isNextDisabled}
              isPreviousDisabled={isPreviousDisabled}
            /> */}
            <UiCarousel gap="12px" ref={anchorRef}>
              {selectedBoard?.columnIds.map((columnId) => {
                return (
                  <BoardColumnContainer key={columnId} columnId={columnId} />
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
        <BoardForm
          onConfirm={handleCreateBoard}
          onClose={() => setIsBoardCreatorOpen(false)}
        />
      </UiModalPaper>
      {!!selectedBoard && (
        <UiModalPaper
          open={isColumnCreatorOpen}
          onClose={() => setIsColumnCreatorOpen(false)}
        >
          <ColumnForm
            onConfirm={handleCreateColumn}
            onClose={() => setIsColumnCreatorOpen(false)}
            boardName={selectedBoard.name}
          />
        </UiModalPaper>
      )}
    </Root>
  );
};
