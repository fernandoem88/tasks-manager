import { getUniqId } from "@/utils/getUniqId";
import { useAppState, useSetAppState } from "..";
import type { Board, BoardColumn, Task } from "@/types";
import { produce } from "immer";
import { DateTime } from "luxon";

interface ActionPayload {
  newBoard: string;
  newBoardColumn: { columnName: string; boardId: string };
  editBoardColumnName: { id: string; name: string };
  newTask: { taskName: string; columnId: string; description?: string };
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
    const column: BoardColumn = {
      name: columnName,
      id,
      boardId,
      tasksIds: [],
    };
    const newState = produce(appState, (draft) => {
      draft.columns[id] = column;
      draft.boards[boardId]?.columnIds.push(id);
    });
    setState(newState);
    return newState;
  };

  const handleEditBoardColumnName = ({
    name,
    id,
  }: ActionPayload["editBoardColumnName"]) => {
    const column = appState.columns[id];
    if (!column) return null;

    const newState = produce(appState, (draft) => {
      draft.columns[id].name = name;
    });
    setState(newState);
    return newState;
  };

  const handleNewTask = ({
    columnId,
    taskName,
    description,
  }: ActionPayload["newTask"]) => {
    const id = getUniqId("task-");
    const createdAt = DateTime.now().toISO();
    const task: Task = {
      title: taskName,
      id,
      columnId,
      description,
      createdAt,
      history: [createdAt],
    };
    const newState = produce(appState, (draft) => {
      draft.tasks[id] = task;
      draft.columns[columnId]?.tasksIds.push(id);
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
      case "editBoardColumnName": {
        type Payload = ActionPayload["editBoardColumnName"];
        return handleEditBoardColumnName(payload as Payload);
      }
      case "newTask": {
        type Payload = ActionPayload["newTask"];
        return handleNewTask(payload as Payload);
      }

      default:
        return appState;
    }
  };
};
