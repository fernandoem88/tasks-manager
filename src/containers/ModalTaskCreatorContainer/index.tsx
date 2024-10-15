import { useAppState } from "@/contexts/AppStateProvider";
import { UiModalPaper } from "@/ui/ModalPaper";
import { TaskCreatorForm } from "@/components/TaskCreatorForm";
import { useDispatch } from "@/contexts/AppStateProvider/hooks/useDispatch";

interface Props {
  taskId?: string;
  columnId: string;
  open: boolean;
  onClose: () => void;
}

export const ModalTaskCreatorContainer = ({
  columnId,
  open,
  onClose,
  taskId = "",
}: Props) => {
  const { columns, tasks } = useAppState();
  const dispatch = useDispatch();

  const column = columns[columnId];
  const task = tasks[taskId];
  const handleCreateTask = (data: { name: string; description?: string }) => {
    dispatch("newTask", {
      columnId,
      taskName: data.name,
      description: data.description,
    });
    onClose();
  };

  const handleEditTask = (data: { name: string; description?: string }) => {
    dispatch("editTask", { ...data, id: taskId });
    onClose();
  };

  return (
    <UiModalPaper open={open} onClose={onClose}>
      <TaskCreatorForm
        data={task}
        columnName={column?.name}
        onConfirm={taskId ? handleEditTask : handleCreateTask}
        onClose={onClose}
      />
    </UiModalPaper>
  );
};
