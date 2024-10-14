import { useAppState } from "@/contexts/AppStateProvider";
import { UiCarouselCard } from "@/ui/Carousel";
import { ColumnHeader, Root, TasksList } from "./styled";
import { UiModalPaper } from "@/ui/ModalPaper";
import { useRef, useState } from "react";
import { TaskCreatorForm } from "@/components/TaskCreatorForm";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { UiButton } from "@/ui/Button";
import { UiTypography } from "@/ui/Typography";
import { UiPopover } from "@/ui/Popover";
import { ColumnForm } from "@/components/ColumnForm";
import { TaskContainer } from "../TaskContainer";
import { ColumnMenu } from "@/components/ColumnMenu";

interface Props {
  columnId: string;
}
export const BoardColumnContainer = ({ columnId }: Props) => {
  const { columns, boards } = useAppState();
  const menuAnchorRef = useRef(null);
  const [isColumnCreatorOpen, setIsColumnCreatorOpen] = useState(false);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false);

  const column = columns[columnId];
  const board = boards[column.boardId];
  const isFirstColumn = board.columnIds[0] === columnId;

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
    setIsMenuOpen(false);
  };

  const handleOpenColumnCreator = () => {
    setIsColumnCreatorOpen(true);
    setIsMenuOpen(false);
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
            onClick={() => setIsMenuOpen(true)}
          >
            &#8942;
          </UiButton>
        </ColumnHeader>

        <TasksList>
          {column.tasksIds.map((taskId) => {
            return <TaskContainer key={taskId} taskId={taskId} />;
          })}
        </TasksList>
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
      <UiPopover
        anchorEl={menuAnchorRef.current}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <ColumnMenu
          onEdit={handleOpenColumnCreator}
          onNewTask={isFirstColumn ? handleOpenTaskCreator : undefined}
        />
      </UiPopover>
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
