import { ProductDetailsQuery, VariantDetailsFragment } from "@/gql/graphql";
import Ratings from "@/components/rating";
import { Pair } from "./pair";
import { VariantSelector } from "./variant-selector";
import AddToCart from "../add-to-cart";

export const Info = ({
  product,
  channel,
  variant,
  discount,
}: {
  product: ProductDetailsQuery["product"];
  variant?: VariantDetailsFragment;
  channel: string;
  discount: number;
}) => {
  const brief = product?.description
    ? JSON.parse(product?.description || "").blocks[0]?.data?.text
    : "";

    console.log(variant,"Test")

  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-1">
        <Ratings rating={product?.rating || 0} />
        <p className="ml-2 text-sm">{product?.rating || 0} Ratings</p>
      </span>
      <h1 className="mt-2 text-xl md:text-4xl font-semibold">
        {product?.name}
      </h1>
      <p
        className="mt-2 text-gray-600 font-[300]"
        dangerouslySetInnerHTML={{ __html: brief }}
      ></p>
      <span className="my-2 text-primary font-semibold text-xl">
        ₹{variant?.pricing?.price?.gross.amount}{" "}
        <span className="text-gray-400 text-sm font-[400] line-through">
          ₹{variant?.pricing?.priceUndiscounted?.gross.amount}
        </span>{" "}
        <span className="text-[#12b985] text-sm">{discount}%</span>
      </span>
      <Pair title={"SKU"} value={variant?.sku || ""} orientation="horizontal" />
      <Pair
        title={"Category"}
        value={product?.category?.name || ""}
        orientation="horizontal"
      />
      <VariantSelector
        channel={channel}
        product={product}
        variants={product?.variants || []}
        selectedVariant={variant}
      />
      {variant && <AddToCart channel={channel} variantId={variant?.id} defaultShow />}
    </div>
  );
};
