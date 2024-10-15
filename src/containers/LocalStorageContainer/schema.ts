import { DateTime } from "luxon";
import { z } from "zod";

const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  columnId: z.string(),
  description: z.string().optional(),
  createdAt: z.string().refine((data) => DateTime.fromISO(data).isValid),
  history: z.array(z.string().refine((data) => DateTime.fromISO(data).isValid)),
});

const columnSchema = z.object({
  id: z.string(),
  name: z.string(),
  boardId: z.string(),
  tasksIds: z.array(z.string()),
});

const boardSchema = z.object({
  id: z.string(),
  name: z.string(),
  columnIds: z.array(z.string()),
});

export const schema = z.object({
  boards: z.record(boardSchema),
  columns: z.record(columnSchema),
  tasks: z.record(taskSchema),
});
