import { getUniqId } from "@/utils/getUniqId";
import { useAppState, useSetAppState } from "..";
import type { Board, BoardColumn, Task } from "@/types";
import { produce } from "immer";
import { DateTime } from "luxon";

interface ActionPayload {
  newBoard: string;
  editBoardName: { id: string; name: string };
  newBoardColumn: { columnName: string; boardId: string };
  editBoardColumnName: { id: string; name: string };
  newTask: { taskName: string; columnId: string; description?: string };
  editTask: Omit<Task, "history" | "createdAt" | "columnId">;
  sendTaskToNextStage: { taskId: string };
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

  const handleEditBoardName = ({
    name,
    id,
  }: ActionPayload["editBoardName"]) => {
    const board = appState.boards[id];

    if (!board) return null;

    const newState = produce(appState, (draft) => {
      draft.boards[id].name = name;
    });

    setState(newState);
    return newState;
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

  const handleSendTaskToNextStage = ({
    taskId,
  }: ActionPayload["sendTaskToNextStage"]) => {
    const task = appState.tasks[taskId];
    if (!task) return null;

    const column = appState.columns[task.columnId];
    if (!column) return null;

    const board = appState.boards[column.boardId];
    if (!board) return null;

    const currentIndex = board.columnIds.findIndex(
      (columnId) => columnId === column.id
    );

    const nextColumnIndex = currentIndex + 1;
    const nextColumnId = board.columnIds[nextColumnIndex];
    const nextColumn = appState.columns[nextColumnId];

    if (!nextColumn) return null;

    const newState = produce(appState, (draft) => {
      const date = DateTime.now().toISO() ?? "";
      draft.columns[task.columnId].tasksIds = draft.columns[
        task.columnId
      ].tasksIds.filter((id) => id !== taskId);
      draft.columns[nextColumnId].tasksIds.unshift(taskId);
      draft.tasks[taskId].columnId = nextColumnId;
      draft.tasks[taskId].history.push(date);
    });
    setState(newState);
    return newState;
  };

  const handleEditTask = ({
    id,
    name,
    description = "",
  }: ActionPayload["editTask"]) => {
    const task = appState.tasks[id];
    if (!task) return null;
    const newState = produce(appState, (draft) => {
      draft.tasks[id] = { ...task, name, description };
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
      name: taskName,
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
      case "editBoardName": {
        type Payload = ActionPayload["editBoardName"];
        return handleEditBoardName(payload as Payload);
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
      case "editTask": {
        type Payload = ActionPayload["editTask"];
        return handleEditTask(payload as Payload);
      }
      case "sendTaskToNextStage": {
        type Payload = ActionPayload["sendTaskToNextStage"];
        return handleSendTaskToNextStage(payload as Payload);
      }

      default:
        return appState;
    }
  };
};
