"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import TrainingItem from "./training-item";
import DeleteConfirmDialog from "../ui/delete-confirm-dialog";

export default function TrainingsList({ trainings }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [trainingIdToDelete, setTrainingIdToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteConfirmed() {
    if (!trainingIdToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/trainings/${trainingIdToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      alert("Error occurred while deleting. Try again later.");
    } finally {
      setIsDeleting(false);
      setTrainingIdToDelete(null);
    }
  }

  return (
    <>
      <DeleteConfirmDialog
        title="Delete exercise?"
        description="This action cannot be undone. This will permanently delete the exercise."
        open={!!trainingIdToDelete}
        onOpenChange={(open) => {
          if (!isDeleting && !open) setTrainingIdToDelete(null);
        }}
        onConfirm={handleDeleteConfirmed}
        isPending={isDeleting}
      />

      <ul className="space-y-4">
        {trainings.map((training) => (
          <li key={training.id}>
            <TrainingItem
              trainingSlug={training.slug}
              trainingId={training.id}
              onDelete={setTrainingIdToDelete}
              title={training.title}
              trainingDate={training.training_date}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
