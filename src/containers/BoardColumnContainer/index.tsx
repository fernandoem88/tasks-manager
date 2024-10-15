import { useAppState } from "@/contexts/AppStateProvider";
import { UiCarouselCard } from "@/ui/Carousel";
import { AddTaskButtonWrapper, ColumnHeader, Root, TasksList } from "./styled";
import { UiModalPaper } from "@/ui/ModalPaper";
import { useRef, useState } from "react";
import { TaskCreatorForm } from "@/components/TaskCreatorForm";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { UiButton } from "@/ui/Button";
import { UiTypography } from "@/ui/Typography";
import { ColumnForm } from "@/components/ColumnForm";
import { TaskContainer } from "../TaskContainer";
import { Droppable } from "@/lib/drag-and-drop/components/Droppable";
import { UiPencilIcon } from "@/ui/PencilIcon";

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

  const accept =
    columnIndex > 0
      ? [String(columnIndex), String(columnIndex - 1)]
      : [String(columnIndex)];

  const handleCreateTask = (data: { name: string; description?: string }) => {
    dispatch("newTask", {
      columnId,
      taskName: data.name,
      description: data.description,
    });
    setIsTaskCreatorOpen(false);
  };

  const handleEditColumnName = (name: string) => {
    dispatch("editBoardColumnName", { name, id: columnId });
    setIsColumnCreatorOpen(false);
  };

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

                <AddTaskButtonWrapper $disabled={isDropTarget}>
                  <UiButton
                    title="new task"
                    disabled={isDropTarget}
                    onClick={handleOpenTaskCreator}
                  >
                    +
                  </UiButton>
                </AddTaskButtonWrapper>

                {placeholder}
              </TasksList>
            );
          }}
        </Droppable>
      </Root>
      <UiModalPaper
        open={isTaskCreatorOpen}
        onClose={() => setIsTaskCreatorOpen(false)}
      >
        <TaskCreatorForm
          columnName={column?.name}
          onConfirm={handleCreateTask}
          onClose={() => setIsTaskCreatorOpen(false)}
        />
      </UiModalPaper>

      <UiModalPaper
        open={isColumnCreatorOpen}
        onClose={() => setIsColumnCreatorOpen(false)}
      >
        <ColumnForm
          boardName={board.name}
          onConfirm={handleEditColumnName}
          initialColumnName={column.name}
          onClose={() => setIsColumnCreatorOpen(false)}
        />
      </UiModalPaper>
    </UiCarouselCard>
  );
};
