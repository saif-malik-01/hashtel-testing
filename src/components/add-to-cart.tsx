"use client";

import { onAddLine } from "@/actions/cart";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  channel: string;
  variantId: string;
};

export default function AddToCart({ channel, variantId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
    setLoading(true);
    const res = await onAddLine(channel, variantId);
    setLoading(false);
    if (res.status !== 200) {
      toast({ title: "Error", description: res.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: res.message });
      router.push(`/${channel}/cart`);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="flex justify-center opacity-0 group-hover/card:opacity-100 transition-opacity w-full absolute bottom-2"
      type="submit"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
