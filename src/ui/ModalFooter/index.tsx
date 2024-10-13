import { UiButton } from "../Button";
import { Root } from "./styled";

interface Props {
  isConfirmDisabled?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const UiModalFooter = ({
  isConfirmDisabled,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <Root>
      {!!onCancel && <UiButton onClick={onCancel}>cancel</UiButton>}
      {!!onConfirm && (
        <UiButton
          variant="contained"
          color={isConfirmDisabled ? undefined : "primary"}
          disabled={isConfirmDisabled}
          onClick={onConfirm}
        >
          confirm
        </UiButton>
      )}
    </Root>
  );
};
