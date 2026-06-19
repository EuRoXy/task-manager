export type TaskFilter = "all" | "active" | "completed";

const filters: { id: TaskFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

type TaskFilterButtonsProps = {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

export default function TaskFilterButtons({
  activeFilter,
  onFilterChange,
}: TaskFilterButtonsProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.map(({ id, label }) => {
        const isActive = activeFilter === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onFilterChange(id)}
            aria-pressed={isActive}
            className={
              isActive
                ? "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                : "rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
