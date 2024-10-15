"use client";

import { useAppState, useSetAppState } from "@/contexts/AppStateProvider";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { schema } from "./schema";

interface Props {
  children: ReactNode;
}

export const STORAGE_ITEM = "tasks-manager";

/**
 *
 * @description this component reads data from the local storage in the client side and initialize the app state.
 * it listens to the beforeUnmount window event to save the current state to the local storage as well.
 *
 */
export const LocalStorageContainer = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const appState = useAppState();
  const setAppState = useSetAppState();
  const appRef = useRef(appState);
  appRef.current = appState;

  const setStateRef = useRef((data: string | null) => {
    if (!data) return;
    const validated = schema.safeParse(JSON.parse(data));

    if (validated.error) return;
    return setAppState(validated.data);
  });

  useEffect(() => {
    const prevState = localStorage.getItem(STORAGE_ITEM);
    setStateRef.current(prevState);
    setIsInitialized(true);

    const handleBeforeUnload = () => {
      const state = appRef.current;
      localStorage.setItem(STORAGE_ITEM, JSON.stringify(state));
    };

    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener("beforeunload", handleBeforeUnload, { signal });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Fragment key={isInitialized ? "initialized" : "not-initialized"}>
      {children}
    </Fragment>
  );
};
