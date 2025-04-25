"use client";

import { onRegister } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignUpForm({
  channel,
  redirect,
}: {
  channel: string;
  redirect?: string;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const errors = await onRegister(redirect, channel, formData);
    if (errors?.[0]) {
      toast({
        title: "Error",
        description: errors[0].message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white border rounded-2xl p-8"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter">
          Create an account
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to get started
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">Full Name</Label>
            <Input
              name="firstName"
              id="firstName"
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input name="lastName" id="lastName" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" id="password" required type="password" />
        </div>
        <Button disabled={loading} className="w-full" type="submit">
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link
          href={`/${channel}/sign-in${redirect ? `?redirect=${redirect}` : ""}`}
          className="underline"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
