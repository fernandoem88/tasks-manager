import { UiListItem } from "@/ui/ListItem";

interface Props {
  onEdit?: () => void;
  isInLastStage?: boolean;
  onMoveToNextStage?: () => void;
}

export const TaskMenu = ({
  isInLastStage,
  onEdit,
  onMoveToNextStage,
}: Props) => {
  return (
    <ul>
      <UiListItem onClick={onEdit} divider>
        Edit Task
      </UiListItem>
      {!isInLastStage && (
        <UiListItem onClick={onMoveToNextStage}>send to next stage</UiListItem>
      )}
    </ul>
  );
};
