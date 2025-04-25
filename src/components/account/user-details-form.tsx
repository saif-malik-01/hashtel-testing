"use client";

import { onUpdateUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

interface UserInputs {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export default function UserDetailsForm(props: UserInputs) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const formdata = new FormData(e.currentTarget);
    const res = await onUpdateUser(formdata);
    if (res.status !== 200) {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: res.message,
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="w-full grid grid-cols-2 gap-4">
        <legend className="col-span-2 mb-6 text-2xl font-semibold leading-8">
          Account Details
        </legend>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="firstName"
            defaultValue={props.firstName}
            name="firstName"
            placeholder="john"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="lastName"
            defaultValue={props.lastName}
            name="lastName"
            placeholder="aliv"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            defaultValue={props.email}
            name="email"
            placeholder="john@example.com"
            required
            disabled
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={props.phoneNumber}
            placeholder="+9191233451233"
            type="number"
          />
        </div>
      </fieldset>
      <Button className="mt-4 w-fit" type="submit">
        {loading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
}
