import { TaskCard } from "@/components/TaskCard";
import { TaskCreatorForm } from "@/components/TaskCreatorForm";
import { useAppState } from "@/contexts/AppStateProvider";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";
import { Draggable } from "@/lib/drag-and-drop/components/Draggable";
import { UiModalPaper } from "@/ui/ModalPaper";
import { useState } from "react";

interface Props {
  taskId: string;
}

export const TaskContainer = ({ taskId }: Props) => {
  const { tasks, columns, boards } = useAppState();
  const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false);
  const dispatch = useDispatch();

  const task = tasks[taskId];
  const column = columns[task.columnId];
  const board = boards[column.boardId];

  const taskIndex = column.tasksIds.findIndex((id) => taskId === id);
  const columnIndex = board.columnIds.findIndex(
    (columnId) => columnId === column.id
  );

  const isInLastStage = columnIndex >= board.columnIds.length - 1;

  if (!task) return null;

  const handleEditTask = (data: { name: string; description?: string }) => {
    dispatch("editTask", { ...data, id: task.id });
    setIsTaskCreatorOpen(false);
  };

  const handleMoveToNextStage = () => {
    dispatch("sendTaskToNextStage", { taskId: task.id });
    setIsTaskCreatorOpen(false);
  };

  return (
    <>
      <Draggable
        type={String(columnIndex)}
        droppableId={column.id}
        id={taskId}
        index={taskIndex}
      >
        {({ ref, style }, { isDragging }) => {
          const opacity = isDragging ? 0 : 1;
          return (
            <div ref={ref} style={{ ...style, opacity }} key={taskId}>
              <TaskCard
                task={task}
                isInLastStage={isInLastStage}
                onEdit={() => setIsTaskCreatorOpen(true)}
                onMoveToNextStage={handleMoveToNextStage}
              />
            </div>
          );
        }}
      </Draggable>
      <UiModalPaper
        open={isTaskCreatorOpen}
        onClose={() => setIsTaskCreatorOpen(false)}
      >
        <TaskCreatorForm
          columnName={column.name}
          data={task}
          onConfirm={handleEditTask}
          onClose={() => setIsTaskCreatorOpen(false)}
        />
      </UiModalPaper>
    </>
  );
};
