"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>Enter your details below to register</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="your username"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button asChild variant="link" className="w-full">
          <Link href="/auth/sign-in">Already have an account? Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
