import fs from "node:fs";
import path from "node:path";
import xss from "xss";

import db from "../db";
import { generateUniqueSlug } from "../server-utils";

export function getExercisesByUserId(userId) {
  return db.prepare("SELECT * FROM exercises WHERE user_id = ?").all(userId);
}

export async function saveExercise(exercise, userId) {
  exercise.slug = await generateUniqueSlug(exercise.title, "exercises");
  exercise.instructions = xss(exercise.instructions);

  const match = exercise.image.match(/^data:(.+);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid image format");
  }

  const mimeType = match[1];
  const base64Data = match[2];
  const extension = mimeType.split("/")[1];

  const fileName = `${exercise.slug}.${extension}`;
  const filePath = `public/images/${fileName}`;

  const buffer = Buffer.from(base64Data, "base64");

  try {
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    throw new Error("Saving image failed!");
  }

  exercise.image = `/images/${fileName}`;

  db.prepare(
    `
      INSERT INTO exercises
        (title, exercise_type, muscle_group, instructions, image, slug, user_id)
      VALUES (
        @title,
        @exercise_type,
        @muscle_group,
        @instructions,
        @image,
        @slug,
        @userId
      )
    `
  ).run({ ...exercise, userId });
}

export function deleteExerciseByUserId(id, userId) {
  const exercise = db
    .prepare("SELECT image FROM exercises WHERE id = ? AND user_id = ?")
    .get(id, userId);

  if (!exercise) {
    return false;
  }

  const result = db
    .prepare(
      `DELETE FROM exercises
       WHERE id = ? AND user_id = ?`
    )
    .run(id, userId);

  if (result.changes > 0 && exercise.image) {
    const filePath = path.join(process.cwd(), "public", exercise.image);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Deleting image failed:", error);
    }
  }

  return result.changes > 0;
}

export async function updateExerciseByUserId(id, userId, updatedData) {
  if (updatedData.instructions) {
    updatedData.instructions = xss(updatedData.instructions);
  }

  const currentExercise = db
    .prepare("SELECT * FROM exercises WHERE id = ? AND user_id = ?")
    .get(id, userId);

  if (!currentExercise) return false;

  let imagePath = currentExercise.image;

  if (updatedData.image && updatedData.image.startsWith("data:")) {
    const match = updatedData.image.match(/^data:(.+);base64,(.*)$/);
    if (!match) {
      throw new Error("Invalid image format");
    }

    const mimeType = match[1];
    const base64Data = match[2];
    const extension = mimeType.split("/")[1];

    const fileName = `${currentExercise.slug}_${Date.now()}.${extension}`;
    const filePath = path.join(process.cwd(), "public", "images", fileName);

    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(filePath, buffer);

    if (currentExercise.image) {
      const oldFilePath = path.join(
        process.cwd(),
        "public",
        currentExercise.image
      );
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    imagePath = `/images/${fileName}`;
  } else {
    imagePath = currentExercise.image;
  }

  db.prepare(
    `
      UPDATE exercises
      SET
        title = @title,
        exercise_type = @exercise_type,
        muscle_group = @muscle_group,
        instructions = @instructions,
        image = @image
      WHERE id = @id AND user_id = @userId
    `
  ).run({
    id,
    userId,
    title: updatedData.title,
    exercise_type: updatedData.exercise_type,
    muscle_group: updatedData.muscle_group,
    instructions: updatedData.instructions,
    image: imagePath,
  });

  const updatedExercise = db
    .prepare("SELECT * FROM exercises WHERE id = ? AND user_id = ?")
    .get(id, userId);

  return updatedExercise;
}
