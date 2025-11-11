"use client";

import LoadingDots from "@/components/ui/loading-dots";

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center pt-[92px] p-6 bg-gray-50 flex-1">
      <LoadingDots />
    </main>
  );
}
