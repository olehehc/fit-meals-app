"use server";

import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/repository/meals";
import { getCurrentUser } from "@/lib/auth";

export default async function MealsPage() {
  const user = await getCurrentUser();
  const meals = await getMeals(user?.id);

  return (
    <main className="flex-1 pt-[92px] p-6 bg-gray-50">
      <MealsGrid meals={meals} currentUserId={user?.id} />
    </main>
  );
}
