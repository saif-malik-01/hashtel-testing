"use server";

import { revalidatePath } from "next/cache";
import { executeGraphQL } from "@/lib/graphql";
import {
  AddressInput,
  CheckoutAddLineDocument,
  CheckoutDeleteLinesDocument,
  UpdateCheckoutShippingDocument,
} from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";

type deleteLineFromCheckoutArgs = {
  lineId: string;
  checkoutId: string;
};

export const deleteLineFromCheckout = async ({
  lineId,
  checkoutId,
}: deleteLineFromCheckoutArgs) => {
  await executeGraphQL(CheckoutDeleteLinesDocument, {
    variables: {
      checkoutId,
      lineIds: [lineId],
    },
    cache: "no-cache",
  });

  revalidatePath("/cart");
};

export async function addItem(channel: string, selectedVariantID: string) {
  const checkout = await Checkout.findOrCreate({
    checkoutId: await Checkout.getIdFromCookies(channel),
    channel: channel,
  });

  if (!checkout?.id) {
    return;
  }

  Checkout.saveIdToCookie(channel, checkout?.id);

  if (!selectedVariantID) {
    return;
  }

  // TODO: error handling
  const data = await executeGraphQL(CheckoutAddLineDocument, {
    variables: {
      id: checkout?.id,
      productVariantId: decodeURIComponent(selectedVariantID),
    },
    cache: "no-cache",
  });

  revalidatePath("/cart");

  if (data.checkoutLinesAdd?.errors) {
    return data.checkoutLinesAdd.errors?.[0]?.message;
  }
}

type updateCheckoutShippingArgs = {
  checkoutId: string;
  shippingAddress: AddressInput;
};

export const updateCheckoutShipping = async ({
  shippingAddress,
  checkoutId,
}: updateCheckoutShippingArgs) => {
  await executeGraphQL(UpdateCheckoutShippingDocument, {
    variables: {
      id: checkoutId,
      shippingAddress,
    },
    cache: "no-cache",
  });

  revalidatePath("/cart/checkout");
};
