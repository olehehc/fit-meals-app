import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/repository/meals";

function Meals() {
  const meals = getMeals();

  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <main className="flex-1 pt-[92px] p-6 bg-gray-50">
      <Meals />
    </main>
  );
}
