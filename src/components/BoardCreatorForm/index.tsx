import { Board } from "@/types";
import { UiButton } from "@/ui/Button";
import { useState } from "react";
import { Root } from "./stled";
import { UiModalFooter } from "@/ui/ModalFooter";
import { UiModalHeader } from "@/ui/ModalHeader";
import { UiModalContent } from "@/ui/ModalContent";
import { UiTextField } from "@/ui/TextField";
import { UiTypography } from "@/ui/Typography";

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
      <UiModalHeader title="Board Form" />
      <UiModalContent>
        <Root>
          <UiTypography>
            please enter the board name and click on confirm to send your
            request
          </UiTypography>
          <UiTextField
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
