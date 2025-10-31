"use client";

import { useState } from "react";
import { toast } from "sonner";

import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addMealToFavoritesByUser,
  removeMealFromFavoritesByUser,
} from "@/lib/repository/meals";
import { getCurrentUser } from "@/lib/auth";

export default function FavoriteButton({ mealId, isFavorite }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isPending, setIsPending] = useState(false);

  async function toggleFavorite() {
    setIsPending(true);

    const user = await getCurrentUser();

    if (!user) {
      toast("Please sign in to add meal to favorites.");
      setIsPending(false);
      return;
    }

    const previousFavorite = favorite;
    const newFavorite = !favorite;

    setFavorite(newFavorite);
    try {
      if (newFavorite) {
        await addMealToFavoritesByUser(mealId, user.id);
        toast("Added to favorites.");
      } else {
        await removeMealFromFavoritesByUser(mealId, user.id);
        toast("Removed from favorites.");
      }
    } catch (error) {
      setFavorite(previousFavorite);
      toast.error(
        `Error occurred while ${
          newFavorite ? "adding" : "removing"
        }. Reload page and try again later.`
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button title="Favorite" onClick={toggleFavorite} disabled={isPending}>
      <FavoriteIcon
        className={`w-5 h-5 ${favorite ? "text-red-500" : "text-gray-400"}`}
      />
    </button>
  );
}
