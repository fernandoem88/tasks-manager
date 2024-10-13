import { getUniqId } from "@/utils/getUniqId";
import { useAppState, useSetAppState } from "..";
import type { Board, BoardColumn } from "@/types";
import { produce } from "immer";

interface ActionPayload {
  newBoard: string;
  newBoardColumn: { columnName: string; boardId: string };
}

export const useDispatch = () => {
  const appState = useAppState();
  const setState = useSetAppState();

  const handleNewBoard = (name: ActionPayload["newBoard"]) => {
    const id = getUniqId("board-");
    const board: Board = { name, id, columnIds: [] };
    const newState = produce(appState, (draft) => {
      draft.boards[id] = board;
    });

    setState(newState);
    return board;
  };

  const handleNewBoardColumn = ({
    boardId,
    columnName,
  }: ActionPayload["newBoardColumn"]) => {
    const id = getUniqId("column-");
    const board: BoardColumn = {
      name: columnName,
      id,
      boardId,
      tasksIds: [],
    };
    const newState = produce(appState, (draft) => {
      draft.columns[id] = board;
      draft.boards[boardId].columnIds.push(id);
    });
    setState(newState);
    return newState;
  };

  return <T extends keyof ActionPayload>(
    action: T,
    payload: ActionPayload[T]
  ) => {
    switch (action) {
      case "newBoard": {
        type Payload = ActionPayload["newBoard"];
        return handleNewBoard(payload as Payload);
      }

      case "newBoardColumn": {
        type Payload = ActionPayload["newBoardColumn"];
        return handleNewBoardColumn(payload as Payload);
      }

      default:
        return appState;
    }
  };
};
