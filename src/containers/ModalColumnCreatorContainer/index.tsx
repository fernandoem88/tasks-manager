import { useAppState } from "@/contexts/AppStateProvider";
import { UiModalPaper } from "@/ui/ModalPaper";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";

import { ColumnForm } from "@/components/ColumnForm";

interface Props {
  boardId: string;
  columnId?: string;
  open: boolean;
  onClose: () => void;
}
export const ModalColumnCreatorContainer = ({
  columnId = "",
  open,
  onClose,
  boardId,
}: Props) => {
  const { columns, boards } = useAppState();
  const dispatch = useDispatch();

  const column = columns[columnId];
  const board = boards[boardId];

  const handleConfirm = (name: string) => {
    if (column) return handleEditColumnName(name);
    handleCreateColumn(name);
  };

  const handleEditColumnName = (name: string) => {
    dispatch("editBoardColumnName", { name, id: columnId });
    onClose();
  };

  const handleCreateColumn = (name: string) => {
    dispatch("newBoardColumn", { name, boardId });
    onClose();
  };

  return (
    <UiModalPaper open={open} onClose={onClose}>
      <ColumnForm
        boardName={board?.name}
        onConfirm={handleConfirm}
        initialColumnName={column?.name}
        onClose={onClose}
      />
    </UiModalPaper>
  );
};
