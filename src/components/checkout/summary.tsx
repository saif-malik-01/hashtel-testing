import { Separator } from "../ui/separator";

type Props = {
  subtotal: number;
  tax: number;
  shippingPrice: number;
};

export default function OrderSummary({ shippingPrice, subtotal, tax }: Props) {
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
          <span>₹ {subtotal | shippingPrice | tax}</span>
        </div>
      </div>
    </div>
  );
}
