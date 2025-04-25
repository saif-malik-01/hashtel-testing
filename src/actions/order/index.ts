"use server";

import { OrderFindDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export const getOrder = async (orderId: string) => {
  const data = await executeGraphQL(OrderFindDocument, {
    variables: {
      id: orderId,
    },
    revalidate: 60,
  });

  if (data.order) return { status: 200, order: data.order };
  return { status: 404, order: null };
};
