"use client";

import { Fragment, ReactNode, useEffect, useRef } from "react";
import { setStore } from "@/store";
import { useAppState } from "@/contexts/AppStateProvider";

interface Props {
  children: ReactNode;
}

/**
 *
 * @description this component listens to the beforeUnmount window event to save the current state to the server side.
 *
 */
export const ServerStorageContainer = ({ children }: Props) => {
  const appState = useAppState();
  const appRef = useRef(appState);
  appRef.current = appState;

  useEffect(() => {
    const handleBeforeUnload = () => {
      const state = appRef.current;
      setStore(state);
    };

    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener("beforeunload", handleBeforeUnload, { signal });

    return () => controller.abort();
  }, []);

  return <Fragment>{children}</Fragment>;
};
