import { getExercisesByUserId } from "@/lib/repository/exercises";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  const exercises = getExercisesByUserId(user.id);

  return Response.json(exercises);
}
