import { Button } from "@/components/ui/button";
import ExercisesTable from "./exercises-table/exercises-table";
import { createExercisesTableColumns } from "@/components/trainings/exercises/exercises-table/exercises-table-columns";

export default function ExercisesSidebar({
  exercises,
  isLoading,
  onOpenCreate,
  onViewOpen,
  onEdit,
  onDelete,
  addedExercises,
}) {
  const columns = createExercisesTableColumns({
    onViewOpen,
    onEditOpen: onEdit,
    onDelete,
  });

  return (
    <aside
      className="w-[30%] min-w-0 hidden xl:block"
      aria-label="Exercises sidebar"
    >
      <div className="mb-6">
        <Button onClick={onOpenCreate}>Add new exercise</Button>
      </div>
      <ExercisesTable
        data={exercises}
        columns={columns}
        isLoading={isLoading}
        addedExercises={addedExercises}
      />
    </aside>
  );
}
