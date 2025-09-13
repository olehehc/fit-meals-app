"use client";

import { useState } from "react";

import CreateExerciseCard from "@/components/exercises/create-exercise-card";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";

export default function CreateTrainingPage() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <main className="flex-1 pt-[92px] p-6 bg-gray-50">
      <Button className="mb-6" onClick={() => setIsOpen(true)}>
        Add new exercise
      </Button>
      {isOpen && (
        <Modal onClose={handleClose}>
          <CreateExerciseCard onClose={handleClose} />
        </Modal>
      )}
    </main>
  );
}
