import { produce } from "immer";

import { DropResult } from "@/lib/drag-and-drop/components/Provider/types";
import { AppState } from "@/types";

export const onReplace = (dropResult: DropResult, state: AppState) => {
  const { sameSource } = dropResult;

  if (sameSource) return onReplaceInSameSource(dropResult, state);

  return onReplaceInDifferentSources(dropResult, state);
};

export const onReplaceInSameSource = (
  dropResult: DropResult,
  state: AppState
) => {
  const { source, destination, sameSource } = dropResult;
  if (!sameSource) return;

  const { index: srcTaskIndex, droppableId: srcColumnId } = source;
  const { index: destTaskIndex } = destination;

  if (srcTaskIndex === destTaskIndex) return;
  if (!state.columns[srcColumnId]) return;

  const result = produce(state, (draft) => {
    const { tasksIds } = draft.columns[srcColumnId];

    const srcItemId = tasksIds[srcTaskIndex as any];

    if (destTaskIndex > srcTaskIndex) {
      tasksIds.splice(destTaskIndex + 1, 0, srcItemId);
      tasksIds.splice(srcTaskIndex, 1);
    } else {
      tasksIds.splice(srcTaskIndex, 1);
      tasksIds.splice(destTaskIndex, 0, srcItemId);
    }
  });

  return result;
};

export const onReplaceInDifferentSources = (
  { source, destination, sameSource }: DropResult,
  state: AppState
) => {
  if (sameSource) return;

  const { droppableId: srcColumnId, id: srcTaskId } = source;
  const { droppableId: destColumnId, index: destTaskIndex } = destination;

  const { columns } = state;

  if (!columns[srcColumnId] || !columns[destColumnId]) return;

  const result = produce(state, (draft) => {
    const srcColumn = draft.columns[srcColumnId];
    const destColumn = draft.columns[destColumnId];
    draft.tasks[srcTaskId].columnId = destColumnId;
    destColumn.tasksIds.splice(destTaskIndex, 0, srcTaskId);
    srcColumn.tasksIds = srcColumn.tasksIds.filter((id) => id !== srcTaskId);
  });

  return result;
};
