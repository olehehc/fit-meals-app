"use server";

import { getCurrentUser } from "@/lib/auth";
import {
  isNotEmpty,
  hasMinLength,
  isAtMostLength,
  isAtLeastSize,
  isUnderSizeLimit,
} from "@/lib/validation";
import {
  saveExercise,
  updateExerciseByUserId,
} from "@/lib/repository/exercises";
import { saveTraining } from "@/lib/repository/trainings";

export async function createExerciseAction(prevState, formData) {
  const user = await getCurrentUser();

  const errors = {};

  const file = formData.get("image");
  let imageBase64 = prevState?.data?.image || null;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    imageBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
  }

  const data = {
    title: formData.get("title"),
    exercise_type: formData.get("exercise_type"),
    muscle_group: formData.get("muscle_group"),
    instructions: formData.get("instructions"),
    image: imageBase64,
  };

  if (!isNotEmpty(data.title)) {
    errors.title = "This field is required";
  } else if (!hasMinLength(data.title, 4)) {
    errors.title = "Title must be at least 4 characters";
  } else if (!isAtMostLength(data.title, 30)) {
    errors.title = "Title cannot exceed 30 characters";
  }

  if (!isNotEmpty(data.exercise_type)) {
    errors.exercise_type = "This field is required";
  }

  if (!isNotEmpty(data.muscle_group)) {
    errors.muscle_group = "This field is required";
  }

  if (!isNotEmpty(data.instructions)) {
    errors.instructions = "This field is required";
  } else if (!hasMinLength(data.instructions, 20)) {
    errors.instructions = "Instructions must be at least 20 characters";
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (!imageBase64) {
    errors.image = "Image is required";
  } else if (file && file.size > 0) {
    if (!isAtLeastSize(file.size, 1)) {
      errors.image = "Image file is empty";
    } else if (!isUnderSizeLimit(file.size, MAX_FILE_SIZE)) {
      errors.image = "Image exceeds maximum size of 5MB";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      data,
    };
  }

  await saveExercise(data, user.id);

  return { ok: true };
}

export async function updateExerciseAction(prevState, formData, initialData) {
  const user = await getCurrentUser();
  const errors = {};

  const file = formData.get("image") || initialData.image;
  let imageBase64 = prevState?.data?.image || initialData.image;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    imageBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
  }

  const data = {
    id: formData.get("id"),
    title: formData.get("title"),
    exercise_type: formData.get("exercise_type"),
    muscle_group: formData.get("muscle_group"),
    instructions: formData.get("instructions"),
    image: imageBase64,
  };

  if (!isNotEmpty(data.title)) {
    errors.title = "This field is required";
  } else if (!hasMinLength(data.title, 4)) {
    errors.title = "Title must be at least 4 characters";
  } else if (!isAtMostLength(data.title, 30)) {
    errors.title = "Title cannot exceed 30 characters";
  }

  if (!isNotEmpty(data.exercise_type)) {
    errors.exercise_type = "This field is required";
  }

  if (!isNotEmpty(data.muscle_group)) {
    errors.muscle_group = "This field is required";
  }

  if (!isNotEmpty(data.instructions)) {
    errors.instructions = "This field is required";
  } else if (!hasMinLength(data.instructions, 20)) {
    errors.instructions = "Instructions must be at least 20 characters";
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (!imageBase64) {
    errors.image = "Image is required";
  } else if (file && file.size > 0) {
    if (!isAtLeastSize(file.size, 1)) {
      errors.image = "Image file is empty";
    } else if (!isUnderSizeLimit(file.size, MAX_FILE_SIZE)) {
      errors.image = "Image exceeds maximum size of 5MB";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      data,
    };
  }

  const updated = await updateExerciseByUserId(data.id, user.id, data);
  if (!updated) {
    return {
      ok: false,
      errors: { general: "Exercise not found or not yours" },
      data,
    };
  }

  return { ok: true, data: updated };
}

export async function saveTrainingAction(trainingData, prevState, formData) {
  const user = await getCurrentUser();
  const errors = {};

  const formattedTrainingData = trainingData.map((exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set) => ({
      ...set,
      reps: Number(set.reps),
      rest_period: Number(set.rest_period),
      weight: Number(set.weight),
    })),
  }));

  const data = {
    title: formData.get("title"),
    training_date: formData.get("date"),
    training: [...formattedTrainingData],
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

  await saveTraining(data, user.id);

  return { ok: true };
}
