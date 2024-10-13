import { Board } from "@/types";
import { UiButton } from "@/ui/Button";
import { UiListItem } from "@/ui/ListItem";
import { Header, List, Root } from "./styled";
import { UiTypography } from "@/ui/Typography";
import { TEXTS } from "./constants";

interface Props {
  boards: string[];
  getBoard: (boardId: string) => Board;
  onCreate: () => void;
  onSelect: (id: string) => void;
}

export const EmptyBoard = ({ boards, getBoard, onCreate, onSelect }: Props) => {
  const alertText = boards.length ? TEXTS.textWithItems : TEXTS.textWithNoItems;
  return (
    <Root>
      <Header>
        <UiTypography variant="h6">Boards List</UiTypography>
        <UiButton onClick={onCreate}>New Board +</UiButton>
      </Header>

      <UiTypography>{alertText}</UiTypography>

      <List>
        {boards.map((boardId) => {
          const board = getBoard(boardId);
          if (!board) return null;
          return (
            <UiListItem key={boardId} onClick={() => onSelect(boardId)}>
              {board.name}
            </UiListItem>
          );
        })}
      </List>
    </Root>
  );
};
