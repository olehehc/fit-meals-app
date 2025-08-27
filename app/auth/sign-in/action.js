"use server";

import { redirect } from "next/navigation";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";

import { getUserByEmail } from "@/lib/repository/users";
import { isNotEmpty, isEmail } from "@/lib/validation";

export default async function signInAction(prevState, formData) {
  const errors = {};
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!isNotEmpty(data.email)) {
    errors.email = "This field is required.";
  } else if (!isEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isNotEmpty(data.password)) {
    errors.password = "This field is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      data,
    };
  }

  const user = getUserByEmail(data.email);

  if (!user) {
    return {
      ok: false,
      errors: {
        email: "Login or password is invalid.",
        password: "Login or password is invalid.",
      },
      data,
    };
  }

  const isPasswordValid = await compare(data.password, user.password);
  if (!isPasswordValid) {
    return {
      ok: false,
      errors: {
        email: "Login or password is invalid.",
        password: "Login or password is invalid.",
      },
      data,
    };
  }

  redirect("/");
}
