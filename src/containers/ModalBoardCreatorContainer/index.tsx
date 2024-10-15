"use client";

import { useAppState } from "@/contexts/AppStateProvider";
import { UiModalPaper } from "@/ui/ModalPaper";
import { BoardForm } from "@/components/BoardCreatorForm";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";

interface Props {
  boardId?: string;
  open: boolean;
  onClose: () => void;
  onSelectBoard?: (boardId: string) => void;
}

export const ModalBoardCreatorContainer = ({
  boardId,
  onClose,
  onSelectBoard,
  open,
}: Props) => {
  const dispatch = useDispatch();
  const { boards } = useAppState();
  const boardIds = Object.keys(boards);
  const isEmptyList = boardIds.length === 0;

  const selectedBoard = boards[boardId ?? ""];

  const handleConfirm = (name: string) => {
    if (!!boardId) return handleEditBoard(name);

    handleCreateBoard(name);
  };

  const handleCreateBoard = (name: string) => {
    const newState = dispatch("newBoard", name);
    onClose();

    if (!isEmptyList) return;

    const [firstBoardId] = Object.keys(newState?.boards ?? {});
    onSelectBoard?.(firstBoardId);
  };

  const handleEditBoard = (name: string) => {
    if (!boardId) return;
    dispatch("editBoardName", { id: boardId, name });
    onClose();
  };

  return (
    <UiModalPaper open={open} onClose={onClose}>
      <BoardForm
        initialName={selectedBoard?.name}
        onConfirm={handleConfirm}
        onClose={onClose}
      />
    </UiModalPaper>
  );
};
