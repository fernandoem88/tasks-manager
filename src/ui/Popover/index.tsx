import React, { useEffect, useRef } from "react";
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
  const onCloseRef = useRef(() => {
    onClose();
  });

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!anchorEl || anchorEl.contains(event.target as Node)) return;
      onCloseRef.current();
    };

    const mouseController = new AbortController();
    const { signal } = mouseController;
    document.addEventListener("mousedown", handleOutsideClick, { signal });

    return () => mouseController.abort();
  }, [open, anchorEl]);

  if (!open || !anchorEl) return null;

  const { top, left, height } = anchorEl.getBoundingClientRect();

  return (
    <>
      <Backdrop onClick={onClose} />
      <PopoverRoot top={top + height + 8} left={left}>
        {children}
      </PopoverRoot>
    </>
  );
};
