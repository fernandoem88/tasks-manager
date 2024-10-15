import { UiAlert } from "@/ui/Alert";
import { UiButton } from "@/ui/Button";
import { MessageWrapper } from "./styled";

interface Props {
  onNewColumn: () => void;
}

export const BoardAlertMessage = ({ onNewColumn }: Props) => (
  <div>
    <UiAlert>
      <MessageWrapper>
        Please add some columns to this board
        <UiButton variant="contained" color="primary" onClick={onNewColumn}>
          +
        </UiButton>
      </MessageWrapper>
    </UiAlert>
  </div>
);
