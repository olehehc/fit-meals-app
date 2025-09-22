import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function SetRow({ exerciseId, setIndex, setData, updateSet }) {
  const { reps, rest_period } = setData;

  return (
    <TableRow key={`${exerciseId}-set-${setIndex}`} className={"bg-gray-100"}>
      <TableCell>Set {setIndex + 1}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Input
          type="number"
          value={reps}
          className="h-8 w-16"
          onChange={(e) =>
            updateSet(exerciseId, setIndex, { reps: Number(e.target.value) })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={rest_period}
          className="h-8 w-16"
          onChange={(e) =>
            updateSet(exerciseId, setIndex, {
              rest_period: Number(e.target.value),
            })
          }
        />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
