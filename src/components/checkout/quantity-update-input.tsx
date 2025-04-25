"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { onUpdateLine } from "@/actions/cart";

type CartQuantityUpdaterProps = {
  quantity: number;
  checkoutId: string;
  lineId: string;
};

const QuantityUpdateInput: React.FC<CartQuantityUpdaterProps> = ({
  quantity,
  checkoutId,
  lineId,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async (quantity: number) => {
    setLoading(true);
    const res = await onUpdateLine(lineId, checkoutId, quantity);
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
    <div className="flex gap-2 items-center">
      <button
        disabled={loading}
        onClick={() => handleUpdate(quantity - 1)}
        className="px-2 border rounded-md"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        disabled={loading}
        onClick={() => handleUpdate(quantity + 1)}
        className="px-2 border rounded-md"
      >
        +
      </button>
    </div>
  );
};

export default QuantityUpdateInput;
