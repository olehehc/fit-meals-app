import TrainingSession from "@/components/sessions/trainings/training-session";
import TrainingSessionResults from "@/components/sessions/trainings/training-session-results";
import { getCurrentUser } from "@/lib/auth";
import { getTrainingSessionByUserAndTrainingId } from "@/lib/repository/sessions";
import { getTrainingAndTrainingSetsByUserAndTrainingId } from "@/lib/repository/trainings";

export default async function TrainingSessionPage({ searchParams }) {
  const query = await searchParams;
  const trainingIdStr = query?.trainingId;
  const trainingId = trainingIdStr ? parseInt(trainingIdStr, 10) : null;

  if (!trainingId) {
    throw new Error("Invalid training ID");
  }

  const user = await getCurrentUser();

  const trainingData = getTrainingAndTrainingSetsByUserAndTrainingId(
    trainingId,
    user.id
  );

  if (!trainingData) {
    throw new Error("Training not found");
  }

  let trainingSessionData;

  if (trainingData.completed) {
    trainingSessionData = await getTrainingSessionByUserAndTrainingId(
      trainingId,
      user.id
    );
  }

  return (
    <main className="flex flex-col items-center justify-start pt-[92px] p-6 bg-gray-50 flex-1">
      {trainingData.completed ? (
        <TrainingSessionResults trainingSessionData={trainingSessionData} />
      ) : (
        <TrainingSession training={trainingData} userId={user.id} />
      )}
    </main>
  );
}
