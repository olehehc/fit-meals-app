import { deleteExerciseByCreator } from "@/lib/repository/exercises";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(req, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    const deleted = deleteExerciseByCreator(id, user.email);

    if (!deleted) {
      return new Response("Exercise not found or not yours", { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
