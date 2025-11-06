import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "next/navigation";
import { addDays } from "date-fns";

export function AllDaysSwitch({ setDateRange }) {
  const searchParams = useSearchParams();

  const urlFrom = searchParams.get("dateFrom");
  const urlTo = searchParams.get("dateTo");

  const checked = searchParams.size === 0 && urlFrom === null && urlTo === null;

  function handleChange(checked) {
    if (checked) {
      setDateRange({ from: null, to: null });
    } else {
      const today = new Date();
      const nextWeek = addDays(today, 6);
      setDateRange({ from: today, to: nextWeek });
    }
  }

  return (
    <div className="flex items-center space-x-2 h-9 w-full">
      <Switch
        id="all-days-mode"
        checked={checked}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="all-days-mode">All days</Label>
    </div>
  );
}
