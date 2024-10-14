import { useState } from "react";
import { Root } from "./styled";
import { UiModalFooter } from "@/ui/ModalFooter";
import { UiModalHeader } from "@/ui/ModalHeader";
import { UiModalContent } from "@/ui/ModalContent";
import { UiTextField } from "@/ui/TextField";
import { UiTypography } from "@/ui/Typography";

interface Props {
  data?: { name: string; description?: string };
  columnName: string;
  onConfirm: (data: { name: string; description?: string }) => void;
  onClose?: () => void;
}

export const TaskCreatorForm = ({
  onClose,
  onConfirm,
  columnName,
  data,
}: Props) => {
  const [name, setName] = useState(data?.name ?? "");
  const [description, setDescription] = useState(data?.description ?? "");

  const isSameName = name === (data?.name || "");
  const isSameDescription = description === (data?.description ?? "");

  const isEmpty = !name;
  const isConfirmDisabled = isEmpty || (isSameName && isSameDescription);

  const handleConfirm = () => {
    if (isConfirmDisabled) return;

    onConfirm({ name, description });
  };

  return (
    <>
      <UiModalHeader title={`${columnName} / Task Form`} />
      <UiModalContent>
        <Root>
          <UiTypography>
            please enter the board name and click on confirm to send your
            request
          </UiTypography>
          <UiTextField
            label="Task Name"
            value={name}
            onChange={(value) => setName(value)}
          />

          <UiTextField
            isTextArea
            placeholder="Task Description"
            label="Task Description"
            value={description}
            onChange={(value) => setDescription(value)}
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
