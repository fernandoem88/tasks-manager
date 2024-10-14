import type { Board } from "@/types";
import { BoardName, ButtonWrapper, Root } from "./styled";
import { UiPopover } from "@/ui/Popover";
import { useRef, useState } from "react";
import { UiListItem } from "@/ui/ListItem";
import { UiButton } from "@/ui/Button";
import { UiPencilIcon } from "@/ui/PencilIcon";

interface Props {
  onSelect: (id: string) => void;
  boards: string[];
  getBoard: (id: string) => Board;
  selectedId?: string;
  onNewBoard?: () => void;
  onNewColumn?: () => void;
}

export const BoardHeader = ({
  boards,
  selectedId,
  onSelect,
  onNewBoard,
  onNewColumn,
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
  const handleSelect = (id: string, event: any) => {
    event.stopPropagation();
    event.preventDefault();
    onSelect(id);
  };

  return (
    <Root>
      <BoardName>{boardName}</BoardName>
      <UiButton
        color="primary"
        variant="contained"
        rounded
        onClick={() => {
          // edit
        }}
        size="sm"
      >
        <UiPencilIcon />
      </UiButton>
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
      <ButtonWrapper>
        <UiButton size="sm" onClick={onNewColumn}>
          new column |||
        </UiButton>
        <UiButton size="sm" onClick={onNewBoard}>
          new board +
        </UiButton>
      </ButtonWrapper>
      <UiPopover
        anchorEl={popoverAnchorRef.current}
        open={isBoardsListOpen}
        onClose={() => handleCloseBoardsList()}
      >
        <ul>
          {boards.map((boardId, index, array) => {
            const board = getBoard(boardId);
            if (!board) return null;
            return (
              <UiListItem
                key={boardId}
                isSelected={boardId === selectedId}
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
