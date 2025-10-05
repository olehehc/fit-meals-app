import { getTrainingsByUserAndDateRange } from "@/lib/repository/trainings";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const trainings = getTrainingsByUserAndDateRange(user.id, dateFrom, dateTo);

    return Response.json(trainings ?? [], { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
