import CheckoutForm from "@/components/checkout/checkout-form";
import OrderSummary from "@/components/checkout/summary";
import { Button } from "@/components/ui/button";
import * as Checkout from "@/lib/checkout";
import Link from "next/link";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  const checkoutId = await Checkout.getIdFromCookies(channel);

  const checkout = await Checkout.find(checkoutId);

  if (!checkout || checkout.lines.length < 1) {
    return (
      <section className="my-14 flex flex-col items-center p-8">
        <h1 className="mt-8 text-3xl font-bold text-neutral-900">
          Your Shopping Cart is empty
        </h1>
        <p className="my-8 text-sm text-neutral-500">
          Looks like you haven't added any items to the cart yet.
        </p>
        <Link href={`/${channel}`}>
          <Button size="lg">Explore products</Button>
        </Link>
      </section>
    );
  }

  return (
    <div className="flex py-16 px-32 justify-center gap-8">
      <CheckoutForm />
      <OrderSummary
        subtotal={checkout.totalPrice.net.amount}
        tax={checkout.totalPrice.tax.amount}
        shippingPrice={checkout.shippingPrice.net.amount}
        total={checkout.totalPrice.gross.amount}
        discount={0}
      />
    </div>
  );
}
