import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getOrder } from "@/actions/order";
import { redirect } from "next/navigation";
import Image from "next/image";
 
export default async function Complete({
  searchParams,
  params
}: {
  searchParams: Promise<{ id: string }>;
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  const { id } = await searchParams;
  const { order } = await getOrder(id);

  if (!order) redirect("/");

  const shippingMethod = order.shippingMethods.find(
    (s) => s.name === order.shippingMethodName
  );

  return (
    <section className="w-7xl p-8 px-32">
      <h1 className="mt-8 text-3xl font-bold text-neutral-900">
        Congratulation 🎉, Order Placed!
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Order Id: {order.number} ({order.statusDisplay})
      </p>
      <form className="mt-8">
        <ul
          data-testid="CartProductList"
          role="list"
          className="divide-y divide-neutral-200 border-b border-t border-neutral-200"
        >
          {order.lines.map((item) => (
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
                    <Link href={`/products/${item.variant?.product.slug}`}>
                      <h2 className="font-medium text-neutral-700">
                        {item.variant?.product?.name}
                      </h2>
                    </Link>
                    <p className="mt-1 text-sm text-neutral-500">
                      {item.variant?.product?.category?.name}
                    </p>
                    {item.variant?.name !== item.variant?.id &&
                      Boolean(item.variant?.name) && (
                        <p className="mt-1 text-sm text-neutral-500">
                          Variant: {item.variant?.name}
                        </p>
                      )}
                  </div>
                  <p className="text-right font-semibold text-neutral-900">
                    ₹{item.undiscountedTotalPrice.gross.amount}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-bold flex gap-6 items-center">
                    Qty: {item.quantity}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <div className="rounded border bg-neutral-50 px-4 py-2">
            <div className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold text-neutral-900">Subtotal:</p>
              </div>
              <div className="font-medium text-neutral-900">
                ₹
                {order.lines.reduce(
                  (a, b) => a + b.undiscountedTotalPrice.gross.amount,
                  0
                )}
              </div>
            </div>
            {order.voucherCode && (
              <div className="flex items-center justify-between gap-2 py-2">
                <div>
                  <p className="font-semibold text-neutral-900">
                    Voucher Applied: ({order.voucherCode})
                  </p>
                </div>
                <div className="font-medium text-neutral-900">
                  {order.discounts.reduce((a, b) => a + b.amount.amount, 0)}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold text-neutral-900">Shipping:</p>
              </div>
              <div className="font-medium text-neutral-900">
                +₹{order.shippingPrice.gross.amount}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold text-neutral-900">Your Total:</p>
              </div>
              <div className="font-medium text-neutral-900">
                ₹{order.total.gross.amount}
              </div>
            </div>
            <p className="text-neutral-500 my-2">
              Your order will be delivered in{" "}
              {shippingMethod?.minimumDeliveryDays} -{" "}
              {shippingMethod?.maximumDeliveryDays} days.
            </p>
          </div>
          <div className="mt-10 text-center">
            <Link href={`/${channel}/shop`} passHref>
              <Button size="lg">Shop More</Button>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
