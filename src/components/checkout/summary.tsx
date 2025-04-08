"use client";

import { initiatePayment } from "@/actions/payment";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {
  subtotal: number;
  tax: number;
  shippingPrice: number;
  total: number;
  discount: number;
};

export default function OrderSummary({
  shippingPrice,
  subtotal,
  tax,
  total,
  discount,
}: Props) {
  const [paymentHtml, setPaymentHtml] = useState(null);

  const handlePay = async () => {
    const formData = new FormData();
    formData.set("amount", "100");
    formData.set("orderInfo", "2343");
    formData.set("returnUrl", "/localhost:3000/payment-confirm");
    const res = await initiatePayment(formData);
    if (res.success && res.html) {
      // Set the HTML content to render in an iframe or trigger redirection
      setPaymentHtml(res.html);
    }
  };

  return (
    <div className="w-1/2 h-fit space-y-6 bg-gray-50 p-6 rounded-lg border">
      <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shippingPrice ? "₹" + shippingPrice : "To be calculated"}
          </span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-semibold text-lg text-gray-800">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>
        <Button onClick={handlePay}>Pay</Button>
      </div>
      {paymentHtml && (
        <div dangerouslySetInnerHTML={{ __html: paymentHtml }} />
      )}
    </div>
  );
}
