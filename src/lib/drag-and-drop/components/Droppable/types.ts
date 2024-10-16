import type { OnDrop } from "../Provider/types";

export interface DroppableChildrenProps {
  ref: (element: any) => void;
  style: React.CSSProperties;
  onMouseOver: (element: any) => void;
  // true if the droppable element is the real target
  "data-shallow-drop-target": boolean;
}

export interface DroppableSnapshot {
  isDropTarget: boolean;
}

export interface DroppableProps {
  key: string;
  id: string;
  accept: string[];
  horizontal?: boolean;
  onDrop?: OnDrop;
  children: (
    props: DroppableChildrenProps,
    snapshot: DroppableSnapshot,
    placeholder: JSX.Element
  ) => JSX.Element;
}
