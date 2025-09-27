  import { TableRow, TableCell } from "@/components/ui/table";
  import { Input } from "@/components/ui/input";
  import { InputWithAddon } from "@/components/ui/input-with-addon";

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
          <Input
            type="number"
            value={reps}
            min={1}
            max={50}
            className="h-8 w-16"
            onChange={(e) =>
              updateSet(exerciseId, setIndex, { reps: Number(e.target.value) })
            }
          />
        </TableCell>
        <TableCell>
          <InputWithAddon
            type="number"
            value={weight}
            step={1}
            min={0}
            onChange={(e) =>
              updateSet(exerciseId, setIndex, {
                weight: Number(e.target.value),
              })
            }
            addon="kg"
          />
        </TableCell>
        <TableCell>
          <InputWithAddon
            type="number"
            value={rest_period}
            step={0.5}
            min={0}
            onChange={(e) =>
              updateSet(exerciseId, setIndex, {
                rest_period: Number(e.target.value),
              })
            }
            addon="min"
          />
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  }
