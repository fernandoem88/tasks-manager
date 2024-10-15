"use client";

import { BoardHeader } from "@/components/BoardHeader";
import { useState } from "react";
import { Root, BoardContent } from "./styled";
import { UiCarousel, UiCarouselCard } from "@/ui/Carousel";
import { useAppState } from "@/contexts/AppStateProvider";
import { EmptyBoard } from "@/components/EmptyBoard";
import { BoardColumnContainer } from "../BoardColumnContainer";
import { BoardAlertMessage } from "@/components/BoardAlertMessage";
import { UiButton } from "@/ui/Button";
import { ModalColumnCreatorContainer } from "../ModalColumnCreatorContainer";
import { ModalBoardCreatorContainer } from "../ModalBoardCreatorContainer";

export const BoardContainer = () => {
  const { boards } = useAppState();
  const boardIds = Object.keys(boards);
  const [isBoardEditMode, setIsBoardEditMode] = useState(false);
  const [isBoardCreatorOpen, setIsBoardCreatorOpen] = useState(false);
  const [isColumnCreatorOpen, setIsColumnCreatorOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(boardIds[0] ?? "");

  const selectedBoard = boards[selectedBoardId];

  const handleCloseBoardCreator = () => {
    setIsBoardCreatorOpen(false);
    setIsBoardEditMode(false);
  };

  const hasColumns = !!selectedBoard?.columnIds.length;
  const hasBoards = !!boardIds.length;

  return (
    <Root>
      {!hasBoards && (
        <EmptyBoard onCreate={() => setIsBoardCreatorOpen(true)} />
      )}

      {hasBoards && (
        <>
          <BoardHeader
            selectedId={selectedBoardId}
            boards={boardIds}
            getBoard={(boardId) => boards[boardId]}
            onSelect={setSelectedBoardId}
            onNewBoard={() => setIsBoardCreatorOpen(true)}
            onEditBoard={() => {
              setIsBoardCreatorOpen(true);
              setIsBoardEditMode(true);
            }}
          />
          <BoardContent>
            {!hasColumns && (
              <BoardAlertMessage
                onNewColumn={() => setIsColumnCreatorOpen(true)}
              />
            )}
            {hasColumns && (
              <UiCarousel gap="12px">
                {selectedBoard?.columnIds.map((columnId) => (
                  <BoardColumnContainer key={columnId} columnId={columnId} />
                ))}
                <UiCarouselCard width="40px">
                  <UiButton
                    title="new column"
                    onClick={() => setIsColumnCreatorOpen(true)}
                  >
                    +
                  </UiButton>
                </UiCarouselCard>
              </UiCarousel>
            )}
          </BoardContent>
        </>
      )}

      <ModalBoardCreatorContainer
        boardId={isBoardEditMode ? selectedBoardId : undefined}
        open={isBoardCreatorOpen}
        onClose={handleCloseBoardCreator}
        onSelectBoard={setSelectedBoardId}
      />
      {!!selectedBoard && (
        <ModalColumnCreatorContainer
          boardId={selectedBoard.id}
          open={isColumnCreatorOpen}
          onClose={() => setIsColumnCreatorOpen(false)}
        />
      )}
    </Root>
  );
};
