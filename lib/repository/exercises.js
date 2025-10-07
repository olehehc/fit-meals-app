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

  if (exercise.image) {
    const extension = exercise.image.name.split(".").pop();
    const timestamp = Date.now();
    const fileName = `${exercise.slug}_${timestamp}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await exercise.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Saving image failed!");
      }
    });

    exercise.image = `/images/${fileName}`;
  } else {
    exercise.image = null;
  }

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
    .prepare("SELECT slug FROM exercises WHERE id = ? AND user_id = ?")
    .get(id, userId);

  if (!currentExercise) {
    return false;
  }

  let imagePath = null;
  if (updatedData.image) {
    const extension = updatedData.image.name.split(".").pop();
    const timestamp = Date.now();
    const fileName = `${updatedData.slug}_${timestamp}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await updatedData.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Saving image failed!");
      }

      if (updatedData.imageToDelete) {
        const oldFilePath = path.join(
          process.cwd(),
          "public",
          updatedData.imageToDelete
        );
        try {
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        } catch (err) {
          console.error("Deleting old image failed:", err);
        }
      }
    });

    imagePath = `/images/${fileName}`;
  }

  db.prepare(
    `
      UPDATE exercises
      SET
        title = @title,
        exercise_type = @exercise_type,
        muscle_group = @muscle_group,
        instructions = @instructions,
        image = COALESCE(@image, image)
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
