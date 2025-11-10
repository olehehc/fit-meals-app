"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "@/lib/auth";
import LoadingDots from "../ui/loading-dots";

export default function SignOutButton({ className }) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function handleLogout() {
    if (isPending) return;
    startTransition(async () => {
      await signOut(pathname);
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={`${className} cursor-pointer`}
    >
      {isPending ? <LoadingDots /> : "Sign Out"}
    </button>
  );
}
