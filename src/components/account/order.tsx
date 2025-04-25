"use client";

import { OrderFragmentFragment } from "@/gql/graphql";
import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const statusMap: Record<string, { text: string; color: string }> = {
  UNCONFIRMED: { text: "Pending", color: "text-gray-600" },
  UNFULFILLED: { text: "Processing", color: "text-yellow-600" },
  FULFILLED: { text: "Delivered", color: "text-green-600" },
  SHIPPED: { text: "Shipped", color: "text-blue-600" },
  CANCELED: { text: "Canceled", color: "text-red-600" },
  RETURNED: { text: "Returned", color: "text-gray-600" },
};

export default function Order({
  id,
  number,
  created,
  status,
  total,
  lines,
}: OrderFragmentFragment) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = format(new Date(created), "MMM d, yyyy");

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(total.gross.amount);

  const { text: displayStatus, color: statusColor } = statusMap[status] || {
    text: status,
    color: "text-gray-600",
  };

  const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-4 items-center">
        <div className="font-semibold text-gray-900">#{number}</div>
        <div className="text-gray-600">{formattedDate}</div>
        <div className={statusColor}>{displayStatus}</div>
        <div className="text-gray-600">{formattedTotal}</div>
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="secondary"
            className="flex items-center text-sm"
            aria-label={
              isExpanded
                ? `Collapse order #${number} details`
                : `Expand order #${number} details`
            }
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span className="hidden sm:inline ml-1">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </span>
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <p className="font-medium">Items:</p>
          <ul
            data-testid="CartProductList"
            role="list"
            className="divide-y divide-neutral-200 border-neutral-200"
          >
            {lines.map((item) => (
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
        </div>
      )}
    </div>
  );
}
