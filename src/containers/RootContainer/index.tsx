"use client";

import { AppStateProvider } from "@/contexts/AppStateProvider";

import { AppContent, AppHeader, AppRoot } from "./styled";
import { BoardContainer } from "../BoardContainer";

export const AppContainer = () => {
  return (
    <AppStateProvider>
      <AppRoot>
        <AppHeader>header</AppHeader>
        <AppContent>
          <BoardContainer />
        </AppContent>
      </AppRoot>
    </AppStateProvider>
  );
};
