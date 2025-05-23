import Image from "next/image";
import * as Checkout from "@/lib/checkout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteLineButton } from "@/components/checkout/delete-line-button";
import { executeGraphQL } from "@/lib/graphql";
import { CurrentUserDocument } from "@/gql/graphql";
import PromoCodeInput from "@/components/checkout/promo-code-input";
import QuantityUpdateInput from "@/components/checkout/quantity-update-input";

export const metadata = {
  title: "Shopping Cart · Hashtel Inc",
};

export default async function Cart({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  const { me } = await executeGraphQL(CurrentUserDocument, { revalidate: 60 });
  const checkoutId = await Checkout.getIdFromCookies(channel);
  const checkout = await Checkout.find(checkoutId);

  if (!checkout || checkout.lines.length < 1) {
    return (
      <section className="flex flex-col items-center p-8">
        <h1 className="mt-8 text-3xl font-bold text-neutral-900">
          Your Shopping Cart is empty
        </h1>
        <p className="my-8 text-sm text-neutral-500">
          Looks like you haven't added any items to the cart yet.
        </p>
        <Link href={`/${channel}/`}>
          <Button size="lg">Explore products</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="w-7xl p-8 px-32">
      <h1 className="mt-8 text-3xl font-bold text-neutral-900">
        Your Shopping Cart
      </h1>
      <form className="mt-12">
        <ul
          data-testid="CartProductList"
          role="list"
          className="divide-y divide-neutral-200 border-b border-t border-neutral-200"
        >
          {checkout.lines.map((item) => (
            <li key={item.id} className="flex py-4">
              <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-50 sm:h-32 sm:w-32">
                {item.variant?.product?.thumbnail?.url && (
                  <Image
                    src={item.variant.product.thumbnail.url}
                    alt={item.variant.product.thumbnail.alt ?? ""}
                    width={200}
                    height={200}
                    className="h-full w-full object-contain object-center"
                  />
                )}
              </div>
              <div className="relative flex flex-1 flex-col justify-between p-4 py-2">
                <div className="flex justify-between justify-items-start gap-4">
                  <div>
                    <Link href={`/products/${item.variant.product.slug}`}>
                      <h2 className="font-medium text-neutral-700">
                        {item.variant?.product?.name}
                      </h2>
                    </Link>
                    <p className="mt-1 text-sm text-neutral-500">
                      {item.variant?.product?.category?.name}
                    </p>
                    {item.variant.name !== item.variant.id &&
                      Boolean(item.variant.name) && (
                        <p className="mt-1 text-sm text-neutral-500">
                          Variant: {item.variant.name}
                        </p>
                      )}
                  </div>
                  <p className="text-right font-semibold text-neutral-900">
                    ₹{item.undiscountedTotalPrice.amount}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-bold flex gap-6 items-center">
                    Qty: {item.quantity}
                    <QuantityUpdateInput
                      checkoutId={checkoutId}
                      lineId={item.id}
                      quantity={item.quantity}
                    />
                  </div>
                  <DeleteLineButton lineId={item.id} checkoutId={checkout.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {!checkout.discountName && (
          <div className="mt-12">
            <div className="rounded border bg-neutral-50 px-4 py-2">
              <PromoCodeInput checkoutId={checkoutId} />
            </div>
          </div>
        )}
        <div className="mt-6">
          <div className="rounded border bg-neutral-50 px-4 py-2">
            <div className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold text-neutral-900">Subtotal:</p>
              </div>
              <div className="font-medium text-neutral-900">
                ₹
                {checkout.lines.reduce(
                  (a, b) => a + b.undiscountedTotalPrice.amount,
                  0
                )}
              </div>
            </div>
            {checkout.discountName && (
              <div className="flex items-center justify-between gap-2 py-2">
                <div>
                  <p className="font-semibold text-neutral-900">
                    Voucher Applied: ({checkout.discountName})
                  </p>
                </div>
                <div className="font-medium text-neutral-900">
                  -₹{checkout.discount?.amount}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold text-neutral-900">Your Total:</p>
              </div>
              <div className="font-medium text-neutral-900">
                ₹{checkout.subtotalPrice.gross.amount}
              </div>
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              *Shipping will be calculated in the next step
            </p>
          </div>
          <div className="mt-10 text-center">
            <Link
              href={
                me?.id
                  ? `/${channel}/cart/checkout`
                  : `/${channel}/sign-in?redirect=/${channel}/cart/checkout`
              }
            >
              <Button size="lg">Checkout</Button>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
