"use client";

import { useState, useEffect } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import CreateExerciseCard from "@/components/trainings/exercises/create-exercise-card";
import ExercisesTable from "@/components/trainings/exercises/exercises-table/exercises-table";
import { ExercisesTableColumns } from "@/components/trainings/exercises/exercises-table/exercises-table-columns";
import TrainingTable from "@/components/trainings/training-table/training-table";
import DraggableRowPreview from "@/components/trainings/exercises/exercises-table/draggable-row-preview";

export default function CreateTrainingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [droppedRows, setDroppedRows] = useState([]);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function loadExercises() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/exercises", { signal });
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadExercises();
    return () => controller.abort();
  }, []);

  function handleClose() {
    setIsOpen(false);
  }

  function handleDragStart(event) {
    setActiveRow(event.active.data.current?.row || null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveRow(null);

    if (over && over.id === "training-dropzone") {
      const exercise = exercises.find((e) => e.id.toString() === active.id);
      if (exercise && !droppedRows.some((r) => r.id === exercise.id)) {
        setDroppedRows((prev) => [...prev, exercise]);
      }
    }
  }

  function handleDragCancel() {
    setActiveRow(null);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <main className="flex-1 pt-[92px] p-6 bg-gray-50">
        <Button className="mb-6" onClick={() => setIsOpen(true)}>
          Add new exercise
        </Button>
        {isOpen && (
          <Modal onClose={handleClose}>
            <CreateExerciseCard onClose={handleClose} />
          </Modal>
        )}
        <div className="flex flex-row w-full justify-between">
          <ExercisesTable
            data={exercises}
            columns={ExercisesTableColumns}
            isLoading={isLoading}
          />
          <div id="training-dropzone" className="w-[60%]">
            <TrainingTable
              droppedRows={droppedRows}
              setDroppedRows={setDroppedRows}
            />
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeRow ? <DraggableRowPreview row={activeRow} /> : null}
        </DragOverlay>
      </main>
    </DndContext>
  );
}
