"use server";

import { getCurrentUser } from "@/lib/auth";
import {
  isNotEmpty,
  hasMinLength,
  isAtMostLength,
  isAtLeastSize,
  isUnderSizeLimit,
} from "@/lib/validation";
import { updateMealByUserId } from "@/lib/repository/meals";

export async function updateMealAction(prevState, formData, initialData) {
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
    user_id: user.id,
    title: formData.get("title"),
    calories: formData.get("calories"),
    protein: formData.get("protein"),
    instructions: formData.get("instructions"),
    image: imageBase64,
  };

  if (!isNotEmpty(data.title)) {
    errors.title = "This field is required";
  } else if (!hasMinLength(data.title, 4)) {
    errors.title = "Title must be at least 4 characters";
  } else if (!isAtMostLength(data.title, 40)) {
    errors.title = "Title cannot exceed 40 characters";
  }

  if (!isNotEmpty(data.calories)) errors.calories = "This field is required";
  if (!isNotEmpty(data.protein)) errors.protein = "This field is required";

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

  const updated = await updateMealByUserId(data.id, user.id, data);
  if (!updated) {
    return {
      ok: false,
      errors: { general: "Meal not found or not yours" },
      data,
    };
  }

  return { ok: true, data: updated };
}
