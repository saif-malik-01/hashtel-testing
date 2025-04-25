"use client";

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import axios from "axios";
import { Address } from "./address-validation";
import { useToast } from "@/hooks/use-toast";

type Props = {
  subtotal: number;
  shippingPrice: number;
  total: number;
  discount: number;
  validAddress: boolean;
  address?: Address | null;
  checkoutId: string;
  channel: string;
  email: string;
};

type PaymentResponse = {
  url: string;
  formData: Record<string, string>;
  error: string;
};

export default function OrderSummary({
  shippingPrice,
  subtotal,
  total,
  discount,
  validAddress,
  address,
  checkoutId,
  channel,
  email,
}: Props) {
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<PaymentResponse>("/api/payment", {
        amount: total,
        orderInfo: `${checkoutId}`.slice(-40),
        channel,
        email,
      });
      const { url, error } = response.data;
      if (url) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = url;
        document.body.appendChild(form);
        form.submit();
      } else {
        toast({
          title: "Payment Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-1/2 h-fit space-y-6 bg-gray-50 p-6 rounded-lg border">
      <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal (Inc. Tax)</span>
          <span>₹{subtotal}</span>
        </div>
        {!!discount && (
          <div className="flex justify-between text-gray-600">
            <span>Voucher</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {address
              ? validAddress
                ? "+₹" + shippingPrice
                : "We are not delivering to this address"
              : "Enter a valid address"}
          </span>
        </div>
        <Separator className="my-4" />
        {!!shippingPrice && (
          <div className="flex justify-between font-semibold text-lg text-gray-800">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        )}
        <Button
          className="w-full"
          disabled={!shippingPrice}
          onClick={handlePayment}
        >
          Proceed to payment
        </Button>
      </div>
    </div>
  );
}
