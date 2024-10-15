"use client";

import { AppStateProvider } from "@/contexts/AppStateProvider";

import { AppContent, AppHeader, AppRoot } from "./styled";
import { BoardContainer } from "../BoardContainer";
import { AppState } from "@/types";
import { ServerStorageContainer } from "../ServerStorageContainer";
import { ResetBtnContainer } from "../ResetBtnContainer";

interface Props {
  initialState: AppState;
}

export const AppContainer = ({ initialState }: Props) => {
  return (
    <AppStateProvider initialState={initialState}>
      <ServerStorageContainer>
        <AppRoot>
          <AppHeader>
            Tasks Manager
            <ResetBtnContainer />
          </AppHeader>
          <AppContent>
            <BoardContainer />
          </AppContent>
        </AppRoot>
      </ServerStorageContainer>
    </AppStateProvider>
  );
};
