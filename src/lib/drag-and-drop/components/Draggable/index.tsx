import { type FC, useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import type { DragItem, DraggableProps } from "./types";
import { useDroppableContext, useGlobalOnDrop } from "../Provider";
import { getElementMargin, getTranslationStyle, handleHover } from "./utils";
import type { DropResult } from "../Provider/types";

const Draggable: FC<DraggableProps> = ({
  onDrop,
  children,
  horizontal,
  ...props
}) => {
  const ref = useRef<any>();
  const onGlobalDrop = useGlobalOnDrop();

  const {
    threesholdIndex,
    threesholdId,
    setThreesholdIndex,
    setThreesholdId,
    getAcceptTypes,
    isDropTarget: isParentActive,
  } = useDroppableContext(props.droppableId);

  const [{ isDragging, draggedItem, style }, drag] = useDrag({
    type: props.type,
    item: () => {
      const element = ref.current as HTMLDivElement;
      const rect = element?.getBoundingClientRect();
      return {
        ...props,
        __rect__: rect,
        margin: getElementMargin(element),
      };
    },
    collect: (monitor) => {
      const draggedItem = monitor.getItem();
      const isDragging = monitor.isDragging();

      const { style } = getTranslationStyle({
        sourceItem: draggedItem,
        destinationItem: props,
        threesholdIndex,
        horizontal,
        domRect: draggedItem?.__rect__,
        isDragging,
        isParentActive,
        margin: draggedItem?.margin,
      });

      return { isDragging, draggedItem, style };
    },
  });

  const [{ isOver }, drop] = useDrop<
    DragItem & { __rect__: DOMRect | undefined },
    { source: any; destination: any; dropType: "combine" },
    { isOver: boolean }
  >({
    accept: getAcceptTypes(),
    collect(monitor) {
      return {
        // handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },

    drop(_rect, monitor) {
      const draggedItem = monitor.getItem() as DragItem;
      if (!draggedItem) return;
      if (monitor.didDrop()) return;

      const isDropTarget = monitor.isOver({ shallow: true });
      if (!isDropTarget) return;

      const result: DropResult = {
        source: {
          index: draggedItem.index,
          id: draggedItem.id,
          droppableId: draggedItem.droppableId,
        },
        destination: {
          index: props.index,
          id: props.id,
          droppableId: props.droppableId,
        },
        dropType: "combine",
        sameSource: draggedItem.droppableId === props.droppableId,
      };

      onDrop?.(result);
      onGlobalDrop?.(result);

      return result as any;
    },

    hover(draggedItem, monitor) {
      handleHover(monitor, {
        sourceItem: draggedItem,
        destinationItem: props,
        ref,
        setThreesholdIndex,
        threesholdIndex,
        horizontal,
      });
    },
  });

  const isDestination = isParentActive && threesholdIndex === props.index;
  const idMismatch = isDestination && threesholdId !== props.id;

  useEffect(() => {
    if (idMismatch) {
      setThreesholdId(props.id);
    }
  }, [idMismatch, setThreesholdId, props.id]);

  const indexMismatch =
    isParentActive &&
    threesholdIndex !== props.index &&
    threesholdId === props.id;

  useEffect(() => {
    if (indexMismatch) {
      setThreesholdId(undefined as any);
    }
  }, [indexMismatch, setThreesholdId, props.id]);

  const isDraggingSource =
    isDragging &&
    draggedItem?.index === props.index &&
    draggedItem?.droppableId === props.droppableId;

  useEffect(() => {
    if (isDraggingSource) {
      setThreesholdIndex(props.index);
      setThreesholdId(props.id);
    }
  }, [
    isDraggingSource,
    setThreesholdIndex,
    setThreesholdId,
    props.index,
    props.id,
  ]);

  const dndRef = useCallback(
    (element: any) => {
      ref.current = drop(drag(element));
    },
    [drag, drop]
  );

  return children({ ref: dndRef, style }, { isDragging, isOver });
};

export { Draggable };
