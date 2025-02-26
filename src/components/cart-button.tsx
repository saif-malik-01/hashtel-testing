"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface CartButtonProps {
  channel: string;
  initialCartItems: number;
}

export default function CartButton({
  channel,
  initialCartItems,
}: CartButtonProps) {
  return (
    <span className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/${channel}/cart`}>
              <Image
                alt="Shopping Bag"
                src="/icons/shopping-bag.png"
                height={22}
                width={22}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cart</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p className="text-sm bg-primary h-6 w-6 flex items-center justify-center rounded-full text-white">
        {initialCartItems}
      </p>
    </span>
  );
}
