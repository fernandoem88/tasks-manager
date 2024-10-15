import { UiListItem } from "@/ui/ListItem";

interface Props {
  onEdit?: () => void;
  onNewTask?: () => void;
}

export const ColumnMenu = ({ onEdit, onNewTask }: Props) => {
  return (
    <ul>
      {!!onEdit && (
        <UiListItem divider onClick={onEdit}>
          Edit Name
        </UiListItem>
      )}
      {!!onNewTask && <UiListItem onClick={onNewTask}>New Task</UiListItem>}
    </ul>
  );
};
