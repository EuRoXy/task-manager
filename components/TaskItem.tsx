"use client";

import { useState } from "react";
import type { Task } from "@/types/task";

type TaskItemProps = {
  task: Task;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

export default function TaskItem({
  task,
  onUpdate,
  onDelete,
  onToggleStatus,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const isCompleted = task.status === "completed";

  function saveEdit() {
    const trimmed = editTitle.trim();
    if (trimmed) onUpdate(task.id, trimmed);
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditTitle(task.title);
    setIsEditing(false);
  }

  function handleDeleteClick() {
    const message = `Delete "${task.title}"? This action cannot be undone.`;
    if (!window.confirm(message)) return;
    onDelete(task.id);
  }

  return (
    <li className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <button
            type="button"
            onClick={() => onToggleStatus(task.id)}
            aria-label={isCompleted ? "Mark as pending" : "Mark as completed"}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition sm:mt-0 ${
              isCompleted
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-zinc-300 hover:border-indigo-400 dark:border-zinc-600"
            }`}
          >
            {isCompleted && (
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 6l3 3 5-5" />
              </svg>
            )}
          </button>

          {isEditing ? (
            <textarea
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  saveEdit();
                }
                if (e.key === "Escape") cancelEdit();
              }}
              rows={3}
              autoFocus
              aria-label="Edit task title"
              className="min-w-0 flex-1 resize-y rounded-lg border border-indigo-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-indigo-500 dark:bg-zinc-950"
            />
          ) : (
            <p
              className={`min-w-0 flex-1 whitespace-pre-wrap break-words text-sm font-medium leading-relaxed sm:text-base ${
                isCompleted
                  ? "text-zinc-400 line-through dark:text-zinc-500"
                  : "text-zinc-900 dark:text-zinc-50"
              }`}
            >
              {task.title}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            }`}
          >
            {isCompleted ? "Completed" : "Pending"}
          </span>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={saveEdit}
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setEditTitle(task.title);
                  setIsEditing(true);
                }}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={handleDeleteClick}
              aria-label={`Delete task: ${task.title}`}
              className="rounded-lg border border-red-300 bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:scale-[0.98] dark:border-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
