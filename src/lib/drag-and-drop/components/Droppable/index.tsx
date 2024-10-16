"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDrop } from "react-dnd";
import { STORE, useGlobalOnDrop } from "../Provider";
import { DroppableProps } from "./types";
import type { DropResult } from "../Provider/types";

const onMouseOver = (e: any) => {
  e.stopPropagation();
};

const containerStyle = { transition: "height 0.3s" };

export const Droppable = (props: DroppableProps) => {
  const [threesholdIndex, setThreesholdIndex] = useState(-1);
  const [threesholdId, setThreesholdId] = useState("");

  const ref = useRef();
  const onGlobalDrop = useGlobalOnDrop();

  const [
    {
      isDropTarget,
      placeholderSize,
      hasDraggedItem,
      sameSource,
      isShallowDropTarget,
    },
    dropRef,
  ] = useDrop<
    any,
    any,
    {
      isDropTarget: boolean;
      sameSource: boolean;
      placeholderSize: number;
      hasDraggedItem: boolean;
      isShallowDropTarget: boolean;
    }
  >({
    accept: props.accept,
    collect(monitor) {
      const isShallowDropTarget = monitor.isOver({ shallow: true });
      const element = ref.current as any;

      const nestedDropTarget = element?.querySelector(
        `[data-shallow-drop-target="true"]`
      );

      const isDropTarget =
        isShallowDropTarget || (!nestedDropTarget && monitor.isOver());
      const draggedItem = monitor.getItem();
      const sameSource = draggedItem && draggedItem?.droppableId === props.id;

      const rect = draggedItem?.__rect__ as DOMRect;
      const marginDeltaHeight = Math.max(
        draggedItem?.margin?.top,
        draggedItem?.margin?.bottom
      );
      const marginDeltaWidth = Math.max(
        draggedItem?.margin?.left,
        draggedItem?.margin?.right
      );

      const marginDelta = props.horizontal
        ? marginDeltaWidth
        : marginDeltaHeight;
      const size = props.horizontal ? rect?.width : rect?.height;
      const placeholderSize =
        isDropTarget && !sameSource ? size + marginDelta : 0;

      return {
        isDropTarget,
        sameSource,
        placeholderSize,
        hasDraggedItem: !!draggedItem,
        isShallowDropTarget,
      };
    },

    drop(_, monitor) {
      const draggedItem = monitor.getItem();
      if (!draggedItem) return;
      if (monitor.didDrop()) return;

      const isDropTarget = monitor.isOver({ shallow: true });
      if (!isDropTarget) return;

      const dropResult: DropResult = {
        source: {
          index: draggedItem.index,
          id: draggedItem.id,
          droppableId: draggedItem.droppableId,
        },
        destination: {
          index: threesholdIndex,
          id: threesholdId,
          droppableId: props.id,
        },
        dropType: "replace",
        sameSource: draggedItem.droppableId === props.id,
      };

      props.onDrop?.(dropResult);
      onGlobalDrop?.(dropResult);

      return dropResult;
    },
  });

  const isDropTargetDifferentSources = isDropTarget && sameSource === false;
  useEffect(() => {
    // set initial threeshold index in case of cross container
    if (threesholdIndex === -1 && isDropTargetDifferentSources) {
      setThreesholdIndex(0);
    }
  }, [isDropTargetDifferentSources, threesholdIndex]);

  const acceptRef = useRef(props.accept);
  acceptRef.current = props.accept;

  // create new context for the droppable zone
  const [dropContext] = useState(() => {
    const prevContext = STORE.droppables[props.id]?.context;

    if (prevContext) return prevContext;

    const newContext = createContext({
      setThreesholdIndex,
      threesholdIndex,
      setThreesholdId,
      threesholdId,
      isDropTarget,
      id: props.id,
      getAcceptTypes: () => acceptRef.current,
    });

    STORE.droppables[props.id] = { context: newContext };

    return newContext;
  });

  useEffect(() => {
    STORE.droppables[props.id] = { context: dropContext };

    return () => {
      delete STORE.droppables[props.id];
    };
  }, [props.id, dropContext]);

  const dropContextValue = useMemo(() => {
    return {
      setThreesholdIndex,
      threesholdIndex,
      setThreesholdId,
      threesholdId,
      isDropTarget,
      id: props.id,
      getAcceptTypes: () => acceptRef.current,
    };
  }, [threesholdId, threesholdIndex, isDropTarget, props.id]);

  const placeholderSizeType = props.horizontal ? "width" : "height";
  const placeholderTransition = hasDraggedItem
    ? `${placeholderSizeType} 0.3s`
    : `${placeholderSizeType} 0.1ms`;

  const placeholder = useMemo(
    () => (
      <div
        className={`${props.id}-placeholder`}
        style={{
          pointerEvents: "none",
          width: props.horizontal ? placeholderSize : "100%",
          height: props.horizontal ? "auto" : placeholderSize,
          transition: placeholderTransition,
        }}
      />
    ),
    [placeholderSize, props.horizontal, props.id, placeholderTransition]
  );

  const innerRef = (element: any) => {
    ref.current = element;
    dropRef(element);
  };

  return (
    <dropContext.Provider value={dropContextValue}>
      {props.children(
        {
          ref: innerRef,
          style: containerStyle,
          "data-shallow-drop-target": isShallowDropTarget,
          onMouseOver,
        },
        { isDropTarget },
        placeholder
      )}
    </dropContext.Provider>
  );
};
