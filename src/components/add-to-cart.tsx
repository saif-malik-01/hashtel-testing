"use client";

import { addItem } from "@/actions/cart";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

type Props = {
  channel: string;
  variantId: string;
};

export default function AddToCart({ channel, variantId }: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setLoading(true);
    const error = await addItem(channel, variantId);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Item added to cart" });
    }
    setLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      className="flex justify-center opacity-0 group-hover/card:opacity-100 transition-opacity w-full absolute bottom-2"
      type="submit"
    >
      {loading ? "Loading..." : "Add to Cart"}
    </Button>
  );
}
