import { useState } from "react";
import { Root } from "./styled";
import { UiModalFooter } from "@/ui/ModalFooter";
import { UiModalHeader } from "@/ui/ModalHeader";
import { UiModalContent } from "@/ui/ModalContent";
import { UiTextField } from "@/ui/TextField";
import { UiTypography } from "@/ui/Typography";
import { UiAlert } from "@/ui/Alert";

interface Props {
  initialName?: string;
  onConfirm: (boardName: string) => void;
  onClose?: () => void;
}

export const BoardForm = ({ onClose, onConfirm, initialName = "" }: Props) => {
  const [boardName, setBoardName] = useState(initialName);

  const isConfirmDisabled = boardName === initialName;

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    onConfirm(boardName);
  };

  return (
    <>
      <UiModalHeader title="Board" subTitle={initialName ? "Edit" : "Create"} />
      <UiModalContent>
        <Root>
          <UiAlert>
            <UiTypography>
              please enter the board name and click on confirm to send your
              request
            </UiTypography>
          </UiAlert>
          <UiTextField
            label="Board Name"
            value={boardName}
            onChange={(value) => setBoardName(value)}
          />
        </Root>
      </UiModalContent>
      <UiModalFooter
        isConfirmDisabled={isConfirmDisabled}
        onCancel={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};
