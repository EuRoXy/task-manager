import TaskManager from "@/components/TaskManager";

export default function Home() {
  return (
    <div className="min-h-full bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <TaskManager />
    </div>
  );
}
