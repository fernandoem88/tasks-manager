import { useState } from "react";
import { Root } from "./styled";
import { UiModalFooter } from "@/ui/ModalFooter";
import { UiModalHeader } from "@/ui/ModalHeader";
import { UiModalContent } from "@/ui/ModalContent";
import { UiTextField } from "@/ui/TextField";
import { UiTypography } from "@/ui/Typography";
import { UiAlert } from "@/ui/Alert";

interface Props {
  initialColumnName?: string;
  boardName: string;
  onConfirm: (columnName: string) => void;
  onClose?: () => void;
}

export const ColumnForm = ({
  onClose,
  onConfirm,
  boardName,
  initialColumnName = "",
}: Props) => {
  const [name, setName] = useState(initialColumnName);

  const isConfirmDisabled = name === initialColumnName;

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    onConfirm(name);
  };

  return (
    <>
      <UiModalHeader
        title={`${boardName} / Column Form`}
        subTitle={initialColumnName ? "Edit" : "Create"}
      />
      <UiModalContent>
        <Root>
          <UiAlert>
            <UiTypography variant="body1">
              Please enter the column name in the text field below and click
              "Confirm" to submit your request.
            </UiTypography>
          </UiAlert>
          <UiTextField
            label="Column Name"
            value={name}
            onChange={(value) => setName(value)}
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
