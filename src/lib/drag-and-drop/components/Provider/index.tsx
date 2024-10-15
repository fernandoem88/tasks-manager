import { DndProvider } from "react-dnd";
import React, { createContext, Context, useContext } from "react";
import { OnDrop, ProviderProps } from "./types";

const ONDROP_CTX = createContext<OnDrop | undefined>(() => {});

const STORE = {
  droppables: {} as {
    [id: string]: {
      context: Context<{
        threesholdIndex: number;
        setThreesholdIndex: React.Dispatch<React.SetStateAction<number>>;
        threesholdId: string;
        setThreesholdId: React.Dispatch<React.SetStateAction<string>>;
        // sameSource: boolean;
        isDropTarget: boolean;
        id: string;
        getAcceptTypes: () => string[];
      }>;
    };
  },
};

const useGlobalOnDrop = () => {
  return useContext(ONDROP_CTX);
};

const useDroppableContext = (droppableId: string) => {
  const data = STORE.droppables[droppableId];
  if (!data) {
    throw new Error("no context found for the following id: " + droppableId);
  }
  return useContext(data.context);
};

const DndCtxProvider = ONDROP_CTX.Provider;

const NestedDndProvider = (props: ProviderProps) => {
  return (
    <DndCtxProvider value={props.onDrop}>
      <DndProvider backend={props.HTML5Backend}>{props.children}</DndProvider>
    </DndCtxProvider>
  );
};

export { useGlobalOnDrop, useDroppableContext, NestedDndProvider, STORE };
