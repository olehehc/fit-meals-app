import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { startOfDay, isSameDay, isValid, addDays } from "date-fns";

export function NextSevenDaysSwitch({
  dateRange = { from: null, to: null },
  setDateRange,
}) {
  const today = startOfDay(new Date());
  const nextWeek = addDays(today, 6);

  const from = dateRange?.from ? new Date(dateRange.from) : null;
  const to = dateRange?.to ? new Date(dateRange.to) : null;

  const isChecked =
    from &&
    to &&
    isValid(from) &&
    isValid(to) &&
    isSameDay(from, today) &&
    isSameDay(to, nextWeek);

  function pretty(range) {
    return {
      from: range?.from ? range.from.toISOString().split("T")[0] : null,
      to: range?.to ? range.to.toISOString().split("T")[0] : null,
    };
  }

  function handleChange(checked) {
    if (checked) {
      const newRange = { from: today, to: nextWeek ?? addDays(today, 6) };
      setDateRange(newRange);
    } else {
      const newRange = { from: today, to: today };
      setDateRange(newRange);
    }
  }

  return (
    <div className="flex items-center space-x-2 h-9 w-full">
      <Switch
        id={`Next 7 days-mode`}
        checked={isChecked}
        onCheckedChange={handleChange}
      />
      <Label htmlFor={`Next 7 days-mode`}>Next 7 days</Label>
    </div>
  );
}
