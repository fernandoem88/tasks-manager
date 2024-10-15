import { useAppState } from "@/contexts/AppStateProvider";
import { UiCarouselCard } from "@/ui/Carousel";
import { AddTaskButtonWrapper, ColumnHeader, Root, TasksList } from "./styled";
import { useRef, useState } from "react";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { UiButton } from "@/ui/Button";
import { UiTypography } from "@/ui/Typography";
import { TaskContainer } from "../TaskContainer";
import { Droppable } from "@/lib/drag-and-drop/components/Droppable";
import { UiPencilIcon } from "@/ui/PencilIcon";
import { ModalColumnCreatorContainer } from "../ModalColumnCreatorContainer";
import { ModalTaskCreatorContainer } from "../ModalTaskCreatorContainer";

interface Props {
  columnId: string;
}
export const BoardColumnContainer = ({ columnId }: Props) => {
  const appState = useAppState();
  const menuAnchorRef = useRef(null);
  const [isColumnCreatorOpen, setIsColumnCreatorOpen] = useState(false);
  const dispatch = useDispatch();
  const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false);

  const column = appState.columns[columnId];
  const board = appState.boards[column.boardId];
  const columnIndex = board.columnIds.findIndex((id) => columnId === id);
  const isFirstColumn = columnIndex === 0;

  const accept =
    columnIndex > 0
      ? [String(columnIndex), String(columnIndex - 1)]
      : [String(columnIndex)];

  const handleOpenTaskCreator = () => {
    setIsTaskCreatorOpen(true);
  };

  const handleOpenColumnCreator = () => {
    setIsColumnCreatorOpen(true);
  };

  if (!column) return null;

  return (
    <UiCarouselCard width={{ xs: "100%", sm: "75%", md: "240px" }}>
      <Root>
        <ColumnHeader>
          <UiTypography variant="h6">{column.name}</UiTypography>
          <UiButton
            ref={menuAnchorRef}
            noElevation
            rounded
            onClick={handleOpenColumnCreator}
          >
            <UiPencilIcon />
          </UiButton>
        </ColumnHeader>
        <Droppable
          key={columnId}
          accept={accept}
          id={columnId}
          onDrop={(dropResult) => dispatch("dragAndDrop", { dropResult })}
        >
          {(dropProps, { isDropTarget }, placeholder) => {
            return (
              <TasksList {...dropProps}>
                {column.tasksIds.map((taskId) => {
                  return <TaskContainer key={taskId} taskId={taskId} />;
                })}

                {isFirstColumn && (
                  <AddTaskButtonWrapper $disabled={isDropTarget}>
                    <UiButton
                      title="new task"
                      disabled={isDropTarget}
                      onClick={handleOpenTaskCreator}
                    >
                      +
                    </UiButton>
                  </AddTaskButtonWrapper>
                )}

                {placeholder}
              </TasksList>
            );
          }}
        </Droppable>
      </Root>

      <ModalTaskCreatorContainer
        open={isTaskCreatorOpen}
        onClose={() => setIsTaskCreatorOpen(false)}
        columnId={columnId}
      />
      <ModalColumnCreatorContainer
        boardId={column.boardId}
        open={isColumnCreatorOpen}
        onClose={() => setIsColumnCreatorOpen(false)}
        columnId={columnId}
      />
    </UiCarouselCard>
  );
};
