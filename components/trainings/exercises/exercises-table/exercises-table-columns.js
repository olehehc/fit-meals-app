"use client";

import ActionsCell from "./actions-cell";

export const createExercisesTableColumns = ({ onEditOpen, onDelete } = {}) => [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "muscle_group", header: "Muscle Group" },
  { accessorKey: "exercise_type", header: "Exercise Type" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const exercise = row.original;
      return (
        <ActionsCell
          exercise={exercise}
          onEditOpen={onEditOpen}
          onDelete={onDelete}
        />
      );
    },
  },
];
