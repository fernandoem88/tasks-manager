import React from "react";
import { Backdrop, PopoverRoot } from "./styled";

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
}

export const UiPopover = ({
  open,
  onClose,
  anchorEl,
  children,
}: PopoverProps) => {
  if (!open || !anchorEl) return null;

  const { top, left, height } = anchorEl.getBoundingClientRect();

  return (
    <Backdrop onClick={onClose}>
      <PopoverRoot
        top={top + height + 8}
        left={left}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </PopoverRoot>
    </Backdrop>
  );
};
