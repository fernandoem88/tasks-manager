import type { Task } from "@/types";
import { Root, TaskHeader, Time } from "./styled";
import { UiTypography } from "@/ui/Typography";
import { DateTime } from "luxon";
import { UiButton } from "@/ui/Button";
import { UiPopover } from "@/ui/Popover";
import { useRef, useState } from "react";
import { TaskMenu } from "../TaskMenu";
import { UiAlert } from "@/ui/Alert";

interface Props {
  task: Task;
  onEdit?: () => void;
  isInLastStage?: boolean;
  onMoveToNextStage?: () => void;
}

export const TaskCard = ({
  task,
  isInLastStage,
  onEdit,
  onMoveToNextStage,
}: Props) => {
  const menuAnchorRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastHystory = task.history[task.history.length - 1];

  const lastDate = DateTime.fromISO(lastHystory);
  const movedOn = lastDate.toFormat("DD");

  const diff = lastDate
    .diffNow()
    .negate()
    .rescale()
    .set({ millisecond: 0, second: 0 })
    .shiftToAll()
    .rescale();

  const time = diff.toHuman({ unitDisplay: "short" });

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit?.();
  };
  const handleMoveToNextStage = () => {
    setIsMenuOpen(false);
    onMoveToNextStage?.();
  };

  return (
    <Root>
      <TaskHeader>
        <UiTypography variant="body1" color="primary">
          {task.name}
        </UiTypography>
        <UiButton
          rounded
          noElevation
          ref={menuAnchorRef}
          onClick={() => setIsMenuOpen(true)}
        >
          &#8942;
        </UiButton>
      </TaskHeader>
      {!!task.description && (
        <UiAlert>
          <UiTypography variant="body2">{task.description}</UiTypography>
        </UiAlert>
      )}
      <Time>
        <UiTypography variant="caption">{movedOn}</UiTypography>
        <UiTypography variant="caption">{time}</UiTypography>
      </Time>
      <UiPopover
        anchorEl={menuAnchorRef.current}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <TaskMenu
          isInLastStage={isInLastStage}
          onEdit={handleEdit}
          onMoveToNextStage={handleMoveToNextStage}
        />
      </UiPopover>
    </Root>
  );
};
