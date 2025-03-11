import Image from "next/image";

import Rating from "./rating";
import { ProductListItemFragment } from "@/gql/graphql";
import Link from "next/link";
import AddToCart from "./add-to-cart";

const ProductCard = ({
  name,
  defaultVariant,
  category,
  rating,
  slug,
  channel,
  thumbnail,
}: ProductListItemFragment & { channel: string }) => {
  return (
    <div className="h-fit border-0 md:min-w-[240px] lg:min-w-[260px] lg:w-[260px] min-w-[160px]">
      <div className="relative flex flex-col items-center w-full h-full object-cover group/card cursor-pointer">
        <Link
          href={`/${channel}/products/${slug}${
            defaultVariant ? `?variantId=${defaultVariant?.id}` : ""
          }`}
          className="w-full h-full"
        >
          <Image
            src={thumbnail?.url || ""}
            width={220}
            height={220}
            alt={thumbnail?.alt || ""}
            className="w-full h-full"
          />
        </Link>
        {defaultVariant?.id && (
          <AddToCart channel={channel} variantId={defaultVariant.id} />
        )}
      </div>
      <div className="flex flex-col items-start gap-1 mt-2">
        <Rating rating={rating || 0} />
        <h3 className="font-semibold md:text-sm text-xs">{name}</h3>
        <span className="font-semibold md:text-sm text-xs">
          {category?.name}
        </span>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className="text-primary text-xl">
              ₹{defaultVariant?.pricing?.price?.gross.amount}
            </p>
            <p className="text-gray-600 text-sm line-through">
              ₹{defaultVariant?.pricing?.priceUndiscounted?.gross.amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
