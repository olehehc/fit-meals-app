import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { useDroppable } from "@dnd-kit/core";

import TrainingTableRow from "./training-table-row";
import SetRow from "./training-table-set-row";
import getTrainingTableColumns from "./training-table-columns";

export default function TrainingTable({
  droppedRows = [],
  setDroppedRows,
  onDelete,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "training-dropzone",
  });

  const rows = droppedRows;

  const columns = getTrainingTableColumns(setRowsWrapper, onDelete);

  function setRowsWrapper(updater) {
    if (typeof updater === "function") {
      setDroppedRows((prev) => updater(prev));
    } else {
      setDroppedRows(updater);
    }
  }

  function updateSet(exerciseId, setIndex, newValues) {
    setDroppedRows((prev) =>
      prev.map((row) =>
        row.id === exerciseId
          ? {
              ...row,
              sets: row.sets.map((s, i) =>
                i === setIndex ? { ...s, ...newValues } : s
              ),
            }
          : row
      )
    );
  }

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-[70vh] overflow-hidden rounded-md border ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <TrainingTableRow row={row} />
              {row.original.sets.map((setData, index) => (
                <SetRow
                  key={`${row.id}-set-${index}`}
                  exerciseId={row.original.id}
                  setIndex={index}
                  setData={setData}
                  updateSet={updateSet}
                />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
