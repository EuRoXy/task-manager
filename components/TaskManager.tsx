"use client";

import { useState } from "react";
import TaskFilterButtons, {
  type TaskFilter,
} from "@/components/TaskFilterButtons";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { addTask, deleteTask, updateTask } from "@/lib/tasks";
import type { Task } from "@/types/task";

function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === "all") return tasks;
  if (filter === "active") {
    return tasks.filter((task) => task.status !== "completed");
  }
  return tasks.filter((task) => task.status === "completed");
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");

  function handleAdd(title: string) {
    setTasks((prev) => addTask(prev, title));
  }

  function handleUpdate(id: string, title: string) {
    setTasks((prev) => updateTask(prev, id, { title: title.trim() }));
  }

  function handleDelete(id: string) {
    setTasks((prev) => deleteTask(prev, id));
  }

  function handleToggleStatus(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  }

  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const filteredTasks = filterTasks(tasks, activeFilter);

  const emptyTitle =
    tasks.length === 0
      ? "No tasks yet"
      : activeFilter === "active"
        ? "No active tasks"
        : "No completed tasks";

  const emptyDescription =
    tasks.length === 0
      ? "Add one above to get started."
      : activeFilter === "all"
        ? "Add one above to get started."
        : "Try a different filter to see other tasks.";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:py-16">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Task Manager
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {tasks.length === 0
            ? "Stay organized — add your first task below."
            : `${pendingCount} pending · ${tasks.length} total`}
        </p>
      </header>

      <section className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 shadow-sm backdrop-blur sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <TaskForm onSubmit={handleAdd} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Your Tasks
        </h2>
        <TaskFilterButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <TaskList
          tasks={filteredTasks}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </section>
    </div>
  );
}
