"use client";

import { useState } from "react";
import { AppContent, AppHeader, AppRoot } from "./styled";
import { UiModalPaper } from "@/ui/ModalPaper";
import { UiModalHeader } from "@/ui/ModalHeader";
import { CarouselExample } from "@/components/CarouselExample";
import { BoardContainer } from "../BoardContainer";

export const AppContainer = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppRoot>
      <AppHeader>header</AppHeader>
      <AppContent>
        <BoardContainer />
        {/* <div>
          <button onClick={() => setOpen(true)}>Open</button>
          <div style={{ width: 400 }}>
            <CarouselExample />
          </div>

          <UiModalPaper open={open} onClose={() => setOpen(false)}>
            <UiModalHeader />
          </UiModalPaper>
        </div> */}
      </AppContent>
    </AppRoot>
  );
};
