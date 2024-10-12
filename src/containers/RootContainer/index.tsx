"use client";

import { useState } from "react";
import { AppHeader, AppRoot } from "./styled";
import { UiModalPaper } from "@/ui/ModalPaper";
import { UiModalHeader } from "@/ui/ModalHeader";
import { CarouselExample } from "@/components/CarouselExample";

export const AppContainer = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppRoot>
      <AppHeader>header</AppHeader>
      <div>
        <button onClick={() => setOpen(true)}>Open</button>
        <div style={{ width: 400 }}>
          <CarouselExample />
        </div>
        <UiModalPaper open={open} onClose={() => setOpen(false)}>
          <UiModalHeader />
        </UiModalPaper>
      </div>
    </AppRoot>
  );
};
