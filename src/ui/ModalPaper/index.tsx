import { ReactNode, useEffect, useRef } from "react";
import { Backdrop, ModalDialog } from "./styled";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const UiModalPaper = ({ open, onClose, children }: Props) => {
  const onCloseRef = useRef(() => {
    onClose();
  });

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      onCloseRef.current();
    };

    const keydownController = new AbortController();
    const { signal } = keydownController;

    window.addEventListener("keydown", handleKeyDown, { signal });

    return () => keydownController.abort();
  }, [open]);

  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalDialog open={open} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalDialog>
    </Backdrop>
  );
};
