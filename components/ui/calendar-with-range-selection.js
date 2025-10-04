"use client";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export function CalendarWithRangeSelection() {
  const [dateRange, setDateRange] = useState(() => ({
    from: new Date(2025, 5, 9),
    to: new Date(2025, 5, 26),
  }));
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
