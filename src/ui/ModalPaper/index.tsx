import { ReactNode } from "react";
import { Backdrop, ModalDialog } from "./styled";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const UiModalPaper = ({ open, onClose, children }: Props) => {
  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalDialog open={open} onClick={(e) => e.stopPropagation()}>
        {open && children}
      </ModalDialog>
    </Backdrop>
  );
};
