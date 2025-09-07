"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import TextAreaWithCounter from "../ui/text-area-with-counter";
import ImagePicker from "../ui/image-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import shareMealAction from "@/app/meals/share/action";

export default function ShareMealCard() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(shareMealAction, {
    errors: null,
    data: {},
  });

  useEffect(() => {
    if (state.ok) {
      toast("Meal has successfully been added! Redirecting...");
      router.push("/meals");
    }
  }, [state.ok, router]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Share your favorite meal</CardTitle>
        <CardDescription>
          Or any other meal you feel needs sharing!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" noValidate action={formAction}>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              defaultValue={state.data?.title}
              className={state.errors?.title && "border-destructive"}
            />
            {state.errors?.title && (
              <p className="text-xs text-destructive">{state.errors.title}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="calories">Calories (kcal)</Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                defaultValue={state.data?.calories}
                className={state.errors?.calories && "border-destructive"}
              />
              {state.errors?.calories && (
                <p className="text-xs text-destructive">
                  {state.errors.calories}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                name="protein"
                type="number"
                defaultValue={state.data?.protein}
                className={state.errors?.protein && "border-destructive"}
              />
              {state.errors?.protein && (
                <p className="text-xs text-destructive">
                  {state.errors.protein}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instructions">Instructions</Label>
            <TextAreaWithCounter state={state} maxChars={500}>
              {state.errors?.instructions && (
                <p className="text-xs text-destructive">
                  {state.errors.instructions}
                </p>
              )}
            </TextAreaWithCounter>
          </div>
          <ImagePicker label="Image" name="image" error={state.errors?.image} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Share Meal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
