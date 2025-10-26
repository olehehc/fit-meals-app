"use client";

import { NumericInput } from "@/components/ui/numeric-input";
import { InputWithAddon } from "@/components/ui/input-with-addon";
import { Checkbox } from "@/components/ui/checkbox";

export default function SetItem({
  setId,
  reps,
  weight,
  rest_period,
  completed,
  exerciseId,
  toggleComplete,
  updateSet,
}) {
  return (
    <div className="bg-white w-full rounded-md border p-2 flex flex-row items-center justify-between">
      <div className="flex gap-2 items-center">
        <p>Reps</p>
        <NumericInput
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={reps}
          min={1}
          max={50}
          className="h-8 w-16"
          onChange={(e) => {
            let raw = e.target.value.replace(",", ".");

            if (raw === "") {
              updateSet(exerciseId, setId, { reps: "0" }); // to change
              return;
            }

            if (reps === "0" && /^[1-9]$/.test(raw)) {
              updateSet(exerciseId, setId, { reps: raw });
              return;
            }

            if (/^0\d+$/.test(raw)) {
              raw = raw.replace(/^0+/, "");
            }

            if (/^\d*\.?\d*$/.test(raw)) {
              updateSet(exerciseId, setId, { reps: raw });
            }
          }}
          disabled={completed}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>Weight</p>
        <InputWithAddon
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={weight}
          step={1}
          min={0}
          onChange={(e) => {
            let raw = e.target.value.replace(",", ".");

            if (raw === "") {
              updateSet(exerciseId, setId, { weight: "0" });
              return;
            }

            if (weight === "0" && /^[1-9]$/.test(raw)) {
              updateSet(exerciseId, setId, { weight: raw });
              return;
            }

            if (/^0\d+$/.test(raw)) {
              raw = raw.replace(/^0+/, "");
            }

            if (/^\d*\.?\d*$/.test(raw)) {
              updateSet(exerciseId, setId, { weight: raw });
            }
          }}
          addon="kg"
          disabled={completed}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>Rest</p>
        <InputWithAddon
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={rest_period}
          step={0.5}
          min={0}
          onChange={(e) => {
            let raw = e.target.value.replace(",", ".");

            if (raw === "") {
              updateSet(exerciseId, setId, { rest_period: "0" });
              return;
            }

            if (rest_period === "0" && /^[1-9]$/.test(raw)) {
              updateSet(exerciseId, setId, { rest_period: raw });
              return;
            }

            if (/^0\d+$/.test(raw)) {
              raw = raw.replace(/^0+/, "");
            }

            if (/^\d*\.?\d*$/.test(raw)) {
              updateSet(exerciseId, setId, { rest_period: raw });
            }
          }}
          addon="min"
          disabled={completed}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>Complete</p>
        <Checkbox
          checked={completed}
          onCheckedChange={() => toggleComplete(exerciseId, setId)}
        />
      </div>
    </div>
  );
}
