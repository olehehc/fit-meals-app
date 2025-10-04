import { deleteTrainingByUserId } from "@/lib/repository/trainings";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(req, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    if (isNaN(id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    const deleted = deleteTrainingByUserId(id, user.id);

    if (!deleted) {
      return new Response("Training not found or not yours", { status: 404 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
