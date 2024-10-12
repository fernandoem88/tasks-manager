import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Animation for sliding in from the right (for desktop)
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Animation for sliding in from the bottom (for mobile)
const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Backdrop style
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Drawer Container, with sliding animations based on screen size
const DrawerRoot = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  max-width: 100%;
  background-color: white;
  box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;

  // Animation for desktop (slide in from right)
  animation: ${({ open }) => (open ? slideInFromRight : "none")} 0.3s forwards;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    bottom: 0;
    top: unset;

    // Animation for mobile (slide in from bottom)
    animation: ${({ open }) => (open ? slideInFromBottom : "none")} 0.3s
      forwards;
  }
`;

export const UiDrawer = ({ open, onClose, children }: DrawerProps) => {
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = () => {
      onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <DrawerRoot open={open}>{children}</DrawerRoot>
    </>
  );
};
