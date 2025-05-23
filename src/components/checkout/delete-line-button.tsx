"use client";

import { onDeleteLine } from "@/actions/cart";
import { useTransition } from "react";

type Props = {
  lineId: string;
  checkoutId: string;
};

export const DeleteLineButton = ({ lineId, checkoutId }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="text-sm text-neutral-500 hover:text-neutral-900"
      onClick={() => {
        if (isPending) return;
        startTransition(() => onDeleteLine(lineId, checkoutId));
      }}
      aria-disabled={isPending}
    >
      {isPending ? "Removing" : "Remove"}
      <span className="sr-only">line from cart</span>
    </button>
  );
};
