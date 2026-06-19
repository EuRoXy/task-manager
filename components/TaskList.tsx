"use client";

import TaskItem from "@/components/TaskItem";
import type { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  emptyTitle?: string;
  emptyDescription?: string;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

export default function TaskList({
  tasks,
  emptyTitle = "No tasks yet",
  emptyDescription = "Add one above to get started.",
  onUpdate,
  onDelete,
  onToggleStatus,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
        <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
          {emptyTitle}
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}
