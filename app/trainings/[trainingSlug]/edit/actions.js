"use server";

import { getCurrentUser } from "@/lib/auth";
import { isNotEmpty, hasMinLength, isAtMostLength } from "@/lib/validation";
import { updateTraining } from "@/lib/repository/trainings";

export async function updateTrainingAction(trainingData, prevState, formData) {
  const user = await getCurrentUser();
  const errors = {};

  console.log(JSON.stringify(trainingData));

  const data = {
    title: formData.get("title"),
    training_date: formData.get("date"),
    training: [...trainingData.training],
  };

  if (!isNotEmpty(data.title)) {
    errors.title = "This field is required";
  } else if (!hasMinLength(data.title, 4)) {
    errors.title = "Title must be at least 4 characters";
  } else if (!isAtMostLength(data.title, 30)) {
    errors.title = "Title cannot exceed 30 characters";
  }

  if (!isNotEmpty(data.training_date)) {
    errors.training_date = "This field is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      data,
    };
  }

  await updateTraining(trainingData.trainingId, data, user.id);

  return { ok: true };
}
