import type { Task } from "@/types/task";

export function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    status: "pending",
  };
}

export function addTask(tasks: Task[], title: string): Task[] {
  const trimmed = title.trim();
  if (!trimmed) return tasks;
  return [...tasks, createTask(trimmed)];
}

export function updateTask(
  tasks: Task[],
  id: string,
  updates: Partial<Pick<Task, "title" | "status">>
): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, ...updates } : task
  );
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}
