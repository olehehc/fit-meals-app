"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { signOut } from "@/lib/auth";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout() {
    if (isPending) return;
    startTransition(async () => {
      await signOut();
      router.push("/");
    });
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="link"
      className="text-sm px-3 py-1 text-secondary opacity-90 hover:opacity-100"
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
