"use client";

import type { AppState } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const EMPTY_APP_STATE: AppState = {
  boards: {},
  columns: {},
  tasks: {},
};

export const appStateContext = createContext<AppState>(EMPTY_APP_STATE);
export const setAppStateContext = createContext((_state: AppState) => {});

export const useAppState = () => useContext(appStateContext);
export const useSetAppState = () => useContext(setAppStateContext);

export const AppStateProvider = ({
  children,
  initialState = EMPTY_APP_STATE,
}: {
  children: ReactNode;
  initialState?: AppState;
}) => {
  const [state, setState] = useState(initialState);

  return (
    <appStateContext.Provider value={state}>
      <setAppStateContext.Provider value={setState}>
        {children}
      </setAppStateContext.Provider>
    </appStateContext.Provider>
  );
};
