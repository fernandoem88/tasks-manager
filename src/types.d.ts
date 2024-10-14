export interface Board {
  id: string;
  name: string;
  columnIds: string[];
}

export interface BoardColumn {
  id: string;
  name: string;
  boardId: string;
  tasksIds: string[];
}

export interface Task {
  id: string;
  title: string;
  columnId: string;
  description?: string;
  createdAt: string;
  history: string[];
}

export interface AppState {
  boards: Record<string, Board>;
  columns: Record<string, BoardColumn>;
  tasks: Record<string, Task>;
}
