"use client";

import { onSignIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignInForm({
  channel,
  redirect,
}: {
  channel: string;
  redirect: string | undefined;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await onSignIn(channel, redirect, formData);
    if (res?.status === 200) {
      toast({
        title: "Success",
        description: res.message,
      });
    } else {
      toast({
        title: "Error",
        description: res?.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white border rounded-2xl p-8 w-2/3"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter">Sign In</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to sign In
        </p>
      </div>
      <div className="space-y-4">
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
          Sign In
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link
          href={`/${channel}/sign-up${redirect ? `?redirect=${redirect}` : ""}`}
          className="underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
