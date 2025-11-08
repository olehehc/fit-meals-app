"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import TextAreaWithCounter from "../../ui/text-area-with-counter";
import ImagePicker from "../../ui/image-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateExerciseAction } from "@/app/trainings/create-training/actions";
import ExerciseTypeDropdown from "./exercise-type-dropdown";
import MuscleGroupDropdown from "./muscle-group-dropdown";
import LoadingDots from "@/components/ui/loading-dots";

export default function EditExerciseCard({ onClose, initialData, onSuccess }) {
  const [state, formAction, isPending] = useActionState(
    (prevState, formData) =>
      updateExerciseAction(prevState, formData, initialData),
    {
      errors: null,
      data: {},
    }
  );

  useEffect(() => {
    if (state.ok) {
      toast("Exercise has successfully been updated!");
      onClose();
      if (onSuccess) {
        onSuccess(state.data);
      }
    }
  }, [state.ok, onClose, onSuccess, state.data]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Edit exercise</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" noValidate action={formAction}>
          <input type="hidden" name="id" value={initialData.id} />

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              defaultValue={
                state.errors?.title ? state.data.title : initialData?.title
              }
              className={state.errors?.title && "border-destructive"}
            />
            {state.errors?.title && (
              <p className="text-xs text-destructive">{state.errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Exercise Type</Label>
              <ExerciseTypeDropdown
                name="exercise_type"
                defaultValue={
                  initialData?.exercise_type || state.data?.exercise_type
                }
                className={state.errors?.exercise_type && "border-destructive"}
              />
              {state.errors?.exercise_type && (
                <p className="text-xs text-destructive">
                  {state.errors.exercise_type}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Muscle Group</Label>
              <MuscleGroupDropdown
                name="muscle_group"
                defaultValue={
                  initialData?.muscle_group || state.data?.muscle_group
                }
                className={state.errors?.muscle_group && "border-destructive"}
              />
              {state.errors?.muscle_group && (
                <p className="text-xs text-destructive">
                  {state.errors.muscle_group}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="instructions">Instructions</Label>
            <TextAreaWithCounter
              state={state}
              maxChars={1000}
              maxVH={25}
              defaultValue={
                initialData?.instructions || state.data?.instructions || ""
              }
            >
              {state.errors?.instructions && (
                <p className="text-xs text-destructive">
                  {state.errors.instructions}
                </p>
              )}
            </TextAreaWithCounter>
          </div>

          <ImagePicker
            defaultImage={state.data?.image || initialData?.image}
            label="Image"
            name="image"
            error={state.errors?.image}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <LoadingDots /> : "Update Exercise"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
