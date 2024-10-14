import type { Task } from "@/types";
import { Root, TaskHeader } from "./styled";
import { UiTypography } from "@/ui/Typography";
import { DateTime } from "luxon";
import { UiButton } from "@/ui/Button";
import { UiPopover } from "@/ui/Popover";
import { useRef, useState } from "react";
import { TaskMenu } from "../TaskMenu";

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
  const movedOn = DateTime.fromISO(lastHystory).toFormat("yy LLL dd");

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
        <UiTypography variant="body2">{task.description}</UiTypography>
      )}
      <UiTypography variant="caption">{movedOn}</UiTypography>
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
