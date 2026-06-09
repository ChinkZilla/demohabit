import {HabitCard} from "./HabitCard";
import type { Habit } from "../utils/DataBaseTypes";

export function HabitSection({
  habits,
  logged,
  onLog,
}: {
  habits: Habit[];
  logged: boolean;
  onLog?: (habitId: number) => void;
}) {
  return (
    <div>
      {habits
        .filter(h =>
          logged
            ? h.status === "logged"
            : h.status !== "logged"
        )
        .map(h => (
          <HabitCard key={h.id} habit={h} onLog={onLog} />
        ))}
    </div>
  );
}