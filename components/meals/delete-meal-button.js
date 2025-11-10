"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmDialog from "../ui/delete-confirm-dialog";
import { deleteMealByUser } from "@/lib/repository/meals";
import { useState } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

export default function DeleteMealButton({ mealId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  async function handleDeleteConfirmed() {
    try {
      setIsDeleting(true);
      const user = await getCurrentUser();
      await deleteMealByUser(mealId, user.id);

      if (pathname === "/meals") {
        router.refresh();
      } else if (
        pathname.startsWith("/meals/") &&
        pathname.split("/").length === 3
      ) {
        router.push("/meals");
      } else {
        router.refresh();
      }

      toast("Meal has been deleted.");
    } catch (error) {
      toast(error?.message || "Error deleting meal");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  }

  return (
    <>
      <DeleteConfirmDialog
        title="Delete meal?"
        description="This action cannot be undone. This will permanently delete the meal."
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteConfirmed}
        isPending={isDeleting}
      />
      <button
        title="Delete"
        onClick={() => setIsOpen(true)}
        className="hover:text-gray-700"
      >
        <DeleteIcon />
      </button>
    </>
  );
}
