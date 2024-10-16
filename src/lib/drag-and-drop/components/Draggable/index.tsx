import { useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DraggableProps, DragItem } from "./types";
import { useDroppableContext } from "../Provider";
import { getElementMargin, getTranslationStyle, handleHover } from "./utils";

const Draggable = ({ children, horizontal, ...props }: DraggableProps) => {
  const ref = useRef<any>();

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
      return { isOver: monitor.isOver() };
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
