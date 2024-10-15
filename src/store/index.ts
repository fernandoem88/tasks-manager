"use server";

import { AppState } from "@/types";

const getInitialState = (): AppState => {
  return {
    boards: {},
    columns: {},
    tasks: {},
  };
};

const store = {
  state: getInitialState(),
};

export const getStore = async () => {
  return store.state;
};

export const setStore = async (appState: AppState) => {
  store.state = appState;
};

export const resetStore = async () => {
  store.state = getInitialState();
};
