import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ImageViewer from "@/components/product-detail/images-viewer";
import { executeGraphQL } from "@/lib/graphql";
import { ProductDetailsDocument } from "@/gql/graphql";
import { redirect } from "next/navigation";
import { Info } from "@/components/product-detail/info";
import { Description } from "@/components/product-detail/decription";

const Detail = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; channel: string }>;
  searchParams: Promise<{ variantId: string }>;
}) => {
  const { slug, channel } = await params;
  const { variantId } = await searchParams;

  const { product } = await executeGraphQL(ProductDetailsDocument, {
    variables: {
      slug,
      channel,
    },
    revalidate: 60,
  });

  if (!product) {
    redirect("/");
  }

  if (!variantId) {
    if (!product.variants?.[0].id) redirect("/");
    redirect(`?variantId=${product.variants?.[0].id}`);
  }

  const variant = product?.variants?.find((p) => p.id === variantId);

  const originalPrice = variant?.pricing?.priceUndiscounted?.gross?.amount;
  const discountedPrice = variant?.pricing?.price?.gross?.amount || 0;

  const discount = originalPrice
    ? ((originalPrice - discountedPrice) / originalPrice) * 100
    : 0;

  return (
    <>
      <Breadcrumb className="md:px-32 px-6 mt-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${channel}/shop`}>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${channel}/shop/${product?.category?.slug}`}
            >
              {product?.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-12 grid md:grid-cols-2 grid-cols-1 gap-8 md:px-32 px-6">
        <ImageViewer images={variant?.media} salePercent={discount} />
        <Info
          product={product}
          variant={variant}
          channel={channel}
          discount={discount}
        />
        <div className="mt-4">
          <h2 className="font-medium text-2xl mb-2">Description</h2>
          <Description description={product?.description} />
        </div>
      </div>
    </>
  );
};

export default Detail;
