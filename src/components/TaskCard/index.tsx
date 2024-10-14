import type { Task } from "@/types";
import { Root, TaskHeader } from "./styled";
import { UiTypography } from "@/ui/Typography";
import { DateTime } from "luxon";
import { UiButton } from "@/ui/Button";

interface Props {
  task: Task;
  onEdit?: () => void;
  asNextStage?: boolean;
  onMoveToNextStage?: () => void;
}

export const TaskCard = ({ task }: Props) => {
  const lastHystory = task.history[task.history.length - 1];
  const movedOn = DateTime.fromISO(lastHystory).toFormat("yy LLL dd");
  return (
    <Root>
      <TaskHeader>
        <UiTypography variant="body1" color="primary">
          {task.title}
        </UiTypography>
        <UiButton rounded noElevation>
          &#8942;
        </UiButton>
      </TaskHeader>
      {!!task.description && (
        <UiTypography variant="body2">{task.description}</UiTypography>
      )}
      <UiTypography variant="caption">{movedOn}</UiTypography>
    </Root>
  );
};
