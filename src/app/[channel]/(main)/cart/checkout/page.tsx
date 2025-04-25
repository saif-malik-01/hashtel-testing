import { CurrentUserDocument } from "@/gql/graphql";
import AddressValidation from "@/components/checkout/address-validation";
import OrderSummary from "@/components/checkout/summary";
import * as Checkout from "@/lib/checkout";
import { executeGraphQL } from "@/lib/graphql";
import { redirect } from "next/navigation";
import { onUpdateDeliveryMethod } from "@/actions/cart";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  const checkoutId = await Checkout.getIdFromCookies(channel);
  const { me } = await executeGraphQL(CurrentUserDocument, {});
  const checkout = await Checkout.find(checkoutId);

  if (!me || !checkout || checkout.lines.length < 1) {
    redirect(`/${channel}/`);
  }

  if (!checkout?.deliveryMethod && checkout?.shippingMethods[0]?.id) {
    await onUpdateDeliveryMethod(checkoutId, checkout?.shippingMethods[0]?.id);
    redirect(`/${channel}/cart/checkout`);
  }

  return (
    <div className="py-16 px-32 flex md:flex-row flex-col items-center justify-center gap-16">
      <AddressValidation
        address={checkout.shippingAddress}
        checkoutId={checkoutId}
      />
      <OrderSummary
        email={me.email}
        channel={channel}
        checkoutId={checkoutId}
        subtotal={checkout.lines.reduce(
          (a, b) => a + b.undiscountedTotalPrice.amount,
          0
        )}
        shippingPrice={checkout.shippingPrice.gross?.amount}
        total={checkout.totalPrice.gross.amount}
        discount={checkout.discount?.amount || 0}
        validAddress={!!checkout.shippingAddress}
        address={checkout.shippingAddress}
      />
    </div>
  );
}
