import { MetadataRoute } from "next";
import { executeGraphQL } from "@/lib/graphql";
import {
  FilteredProductItemListDocument,
  OrderDirection,
  ProductCategoryListDocument,
} from "@/gql/graphql";
import { CHANNELS } from "@/constants/global";

const BASE_URL = process.env.BASE_URL || "https://www.hashtel.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/terms-and-conditions",
    "/warranty-policy",
    "/return-policy",
    "/sign-in",
    "/sign-up",
    "/account",
    "/cart",
    "/oem",
  ];

  const staticPages = CHANNELS.flatMap((channel) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${channel}${route}`,
      lastModified: now,
    }))
  );

  const { categories } = await executeGraphQL(ProductCategoryListDocument, {
    revalidate: 60,
    withAuth: false,
  });
  const categorySlugs = categories?.edges.map((edge) => edge.node.slug) || [];

  const categoryPages = CHANNELS.flatMap((channel) =>
    categorySlugs.map((slug) => ({
      url: `${BASE_URL}/${channel}/shop/${slug}`,
      lastModified: now,
    }))
  );

  const allProductPages = [];

  for (const channel of CHANNELS) {
    const { products } = await executeGraphQL(FilteredProductItemListDocument, {
      variables: { channel, sortBy: OrderDirection.Asc, first: 100 },
    });

    const slugs = products?.edges.map((edge) => edge.node.slug) || [];

    allProductPages.push(
      ...slugs.map((slug) => ({
        url: `${BASE_URL}/${channel}/products/${slug}`,
        lastModified: now,
      }))
    );
  }

  return [...staticPages, ...categoryPages, ...allProductPages];
}
