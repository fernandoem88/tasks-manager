"use client";

import { AppStateProvider } from "@/contexts/AppStateProvider";

import { AppContent, AppHeader, AppRoot } from "./styled";
import { BoardContainer } from "../BoardContainer";
import { AppState } from "@/types";
import { ServerStorageContainer } from "../ServerStorageContainer";
import { ResetBtnContainer } from "../ResetBtnContainer";
import { NestedDndProvider } from "@/lib/drag-and-drop/components/Provider";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Props {
  initialState: AppState;
}

export const AppContainer = ({ initialState }: Props) => {
  return (
    <AppStateProvider initialState={initialState}>
      <ServerStorageContainer>
        <NestedDndProvider HTML5Backend={HTML5Backend}>
          <AppRoot>
            <AppHeader>
              Tasks Manager
              <ResetBtnContainer />
            </AppHeader>
            <AppContent>
              <BoardContainer />
            </AppContent>
          </AppRoot>
        </NestedDndProvider>
      </ServerStorageContainer>
    </AppStateProvider>
  );
};
