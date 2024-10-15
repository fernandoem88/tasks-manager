"use client";

import { BoardHeader } from "@/components/BoardHeader";
import { useState } from "react";
import { Root, BoardContent } from "./styled";
import { UiCarousel, UiCarouselCard } from "@/ui/Carousel";
import { useAppState } from "@/contexts/AppStateProvider";
import { EmptyBoard } from "@/components/EmptyBoard";
import { UiModalPaper } from "@/ui/ModalPaper";
import { BoardForm } from "@/components/BoardCreatorForm";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { BoardColumnContainer } from "../BoardColumnContainer";
import { ColumnForm } from "@/components/ColumnForm";
import { BoardAlertMessage } from "@/components/BoardAlertMessage";
import { UiButton } from "@/ui/Button";

export const BoardContainer = () => {
  const dispatch = useDispatch();
  const { boards } = useAppState();
  const boardIds = Object.keys(boards);
  const [isBoardEditMode, setIsBoardEditMode] = useState(false);
  const [isBoardCreatorOpen, setIsBoardCreatorOpen] = useState(false);
  const [isColumnCreatorOpen, setIsColumnCreatorOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(boardIds[0] ?? "");

  const selectedBoard = boards[selectedBoardId];

  const handleCreateBoard = (name: string) => {
    if (isBoardEditMode) return handleEditBoard(name);

    const newState = dispatch("newBoard", name);
    setIsBoardCreatorOpen(false);

    const boardIds = Object.keys(newState?.boards ?? {});
    const isFirstBoard = boardIds.length === 1;
    if (!isFirstBoard) return;
    setSelectedBoardId(boardIds[0]);
  };

  const handleEditBoard = (name: string) => {
    dispatch("editBoardName", { id: selectedBoardId, name });
    setIsBoardCreatorOpen(false);
    setIsBoardEditMode(false);
  };

  const handleCloseBoardCreator = () => {
    setIsBoardCreatorOpen(false);
    setIsBoardEditMode(false);
  };

  const handleCreateColumn = (name: string) => {
    if (!selectedBoard) return;
    dispatch("newBoardColumn", { boardId: selectedBoardId, columnName: name });
    setIsColumnCreatorOpen(false);
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

      <UiModalPaper open={isBoardCreatorOpen} onClose={handleCloseBoardCreator}>
        <BoardForm
          initialName={isBoardEditMode ? selectedBoard?.name : undefined}
          onConfirm={handleCreateBoard}
          onClose={handleCloseBoardCreator}
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
