import type { Board } from "@/types";
import { BoardName, Root } from "./styled";
import { UiPopover } from "@/ui/Popover";
import { useRef, useState } from "react";
import { UiListItem } from "@/ui/ListItem";
import { UiButton } from "@/ui/Button";

interface Props {
  onSelect: (id: number) => void;
  boards: (number | string)[];
  getBoard: (id: number) => Board;
  selectedId?: number;
  onNewBoard?: () => void;
}

export const BoardHeader = ({
  boards,
  selectedId,
  onSelect,
  onNewBoard,
  getBoard,
}: Props) => {
  const popoverAnchorRef = useRef(null);
  const [isBoardsListOpen, setIsBoardsListOpen] = useState(false);
  const selected = selectedId ? getBoard(selectedId) : undefined;
  const boardName = selected?.name ?? "--";
  const hasManyBoards = boards.length > 1;

  const handleOpenBoardsList = () => {
    if (!hasManyBoards) return;
    setIsBoardsListOpen(true);
  };

  const handleCloseBoardsList = () => setIsBoardsListOpen(false);
  const handleSelect = (id: number, event: any) => {
    event.stopPropagation();
    event.preventDefault();
    onSelect(id);
  };

  return (
    <Root>
      <BoardName>{boardName}</BoardName>
      {hasManyBoards && (
        <UiButton
          color="primary"
          variant="contained"
          rounded
          ref={popoverAnchorRef}
          onClick={handleOpenBoardsList}
          size="sm"
        >
          &#9660;
        </UiButton>
      )}
      <UiButton onClick={onNewBoard}>Add +</UiButton>
      <UiPopover
        anchorEl={popoverAnchorRef.current}
        open={isBoardsListOpen}
        onClose={() => handleCloseBoardsList()}
      >
        <ul>
          {boards.map((boardId, index, array) => {
            const board = getBoard(+boardId);
            if (!board) return null;
            return (
              <UiListItem
                key={boardId}
                onClick={(e) => handleSelect(board.id, e)}
                divider={index < array.length - 1}
              >
                {board.name}
              </UiListItem>
            );
          })}
        </ul>
      </UiPopover>
    </Root>
  );
};
