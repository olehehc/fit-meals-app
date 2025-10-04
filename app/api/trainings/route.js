import { getTrainingsByUserId } from "@/lib/repository/trainings";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  const trainings = getTrainingsByUserId(user.id);

  return Response.json(trainings);
}
