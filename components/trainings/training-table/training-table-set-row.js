import { TableRow, TableCell } from "@/components/ui/table";
import { InputWithAddon } from "@/components/ui/input-with-addon";
import { NumericInput } from "@/components/ui/numeric-input";

export default function SetRow({
  exerciseId,
  setIndex,
  setData,
  updateSet,
  className,
}) {
  const { reps, rest_period, weight } = setData;

  return (
    <TableRow key={`${exerciseId}-set-${setIndex}`} className={className}>
      <TableCell colSpan={4}>Set {setIndex + 1}</TableCell>
      <TableCell>
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
              updateSet(exerciseId, setIndex, { reps: "0" });
              return;
            }

            if (reps === "0" && /^[1-9]$/.test(raw)) {
              updateSet(exerciseId, setIndex, { reps: raw });
              return;
            }

            if (/^0\d+$/.test(raw)) {
              raw = raw.replace(/^0+/, "");
            }

            if (/^\d*\.?\d*$/.test(raw)) {
              updateSet(exerciseId, setIndex, { reps: raw });
            }
          }}
        />
      </TableCell>
      <TableCell>
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
              updateSet(exerciseId, setIndex, { weight: "0" });
              return;
            }

            if (weight === "0" && /^[1-9]$/.test(raw)) {
              updateSet(exerciseId, setIndex, { weight: raw });
              return;
            }

            if (/^0\d+$/.test(raw)) {
              raw = raw.replace(/^0+/, "");
            }

            if (/^\d*\.?\d*$/.test(raw)) {
              updateSet(exerciseId, setIndex, { weight: raw });
            }
          }}
          addon="kg"
        />
      </TableCell>
      <TableCell>
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
              updateSet(exerciseId, setIndex, { rest_period: "0" });
              return;
            }

            if (rest_period === "0" && /^[1-9]$/.test(raw)) {
              updateSet(exerciseId, setIndex, { rest_period: raw });
              return;
            }

            if (/^0\d+$/.test(raw)) {
              raw = raw.replace(/^0+/, "");
            }

            if (/^\d*\.?\d*$/.test(raw)) {
              updateSet(exerciseId, setIndex, { rest_period: raw });
            }
          }}
          addon="min"
        />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
