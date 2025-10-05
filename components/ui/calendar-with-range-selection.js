import { Calendar } from "@/components/ui/calendar";

export function CalendarWithRangeSelection({ dateRange, setDateRange }) {
  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)] shadow-sm"
    />
  );
}
