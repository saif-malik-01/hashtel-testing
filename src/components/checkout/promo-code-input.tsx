"use client";

import { onAddPromoCode } from "@/actions/cart";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function PromoCodeInput({ checkoutId }: { checkoutId: string }) {
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleApplyPromoCode = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    const res = await onAddPromoCode(checkoutId, promoCode);
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
      setPromoCode("");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-between items-center">
      <Input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Enter promo code"
        className="p-2 border w-1/3"
      />
      <Button disabled={!promoCode} onClick={handleApplyPromoCode}>
        {loading ? "Loading..." : "Apply"}
      </Button>
    </div>
  );
}
