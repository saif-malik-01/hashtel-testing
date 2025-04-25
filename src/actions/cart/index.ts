"use server";

import { revalidatePath } from "next/cache";
import { executeGraphQL } from "@/lib/graphql";
import {
  AddressInput,
  CheckoutAddLineDocument,
  CheckoutAddPromoDocument,
  CheckoutDeleteLinesDocument,
  CheckoutUpdateLineDocument,
  CompleteCheckoutDocument,
  UpdateCheckoutBillingDocument,
  UpdateCheckoutShippingDocument,
  UpdateCheckoutShippingMethodDocument,
} from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";

export const onDeleteLine = async (lineId: string, checkoutId: string) => {
  await executeGraphQL(CheckoutDeleteLinesDocument, {
    variables: {
      checkoutId,
      lineIds: [lineId],
    },
    cache: "no-cache",
  });

  revalidatePath("/");
};

export const onAddLine = async (channel: string, variantID: string) => {
  let checkoutId = await Checkout.getIdFromCookies(channel);

  if (!checkoutId) {
    const res = await Checkout.create({
      channel: channel,
    });
    checkoutId = res.checkoutCreate?.checkout?.id || "";
  }

  if (!checkoutId) return { status: 200, message: "Server error" };

  Checkout.saveIdToCookie(channel, checkoutId);

  if (!variantID) return { status: 200, message: "Product required" };

  const res = await executeGraphQL(CheckoutAddLineDocument, {
    variables: {
      id: checkoutId,
      productVariantId: decodeURIComponent(variantID),
    },
    cache: "no-cache",
  });

  if (res.checkoutLinesAdd?.errors[0]) {
    return { status: 500, message: res.checkoutLinesAdd?.errors[0].message };
  }

  revalidatePath("/cart");
  return { status: 200, message: "Line added" };
};

export const onUpdateCheckoutAddress = async (
  address: AddressInput,
  checkoutId: string
) => {
  const [shippingRes, billingRes] = await Promise.all([
    await executeGraphQL(UpdateCheckoutShippingDocument, {
      variables: {
        id: checkoutId,
        shippingAddress: address,
      },
      cache: "no-cache",
    }),
    await executeGraphQL(UpdateCheckoutBillingDocument, {
      variables: {
        id: checkoutId,
        billingAddress: address,
      },
      cache: "no-cache",
    }),
  ]);

  if (
    shippingRes.checkoutShippingAddressUpdate?.errors[0] ||
    billingRes.checkoutBillingAddressUpdate?.errors[0]
  ) {
    return {
      status: 500,
      message:
        shippingRes.checkoutShippingAddressUpdate?.errors[0].message ||
        billingRes.checkoutBillingAddressUpdate?.errors[0].message,
    };
  }

  revalidatePath("/");

  return {
    status: 200,
    message: "Address updated",
  };
};

export const onUpdateDeliveryMethod = async (
  checkoutId: string,
  methodId: string
) => {
  const res = await executeGraphQL(UpdateCheckoutShippingMethodDocument, {
    variables: {
      checkoutId: checkoutId,
      methodId: methodId,
    },
    cache: "no-cache",
  });

  if (res.checkoutDeliveryMethodUpdate?.errors[0]) {
    return {
      status: 500,
      message: res.checkoutDeliveryMethodUpdate?.errors[0].message,
    };
  }
  return { status: 200, message: "Delivery method updated" };
};

export const onUpdateLine = async (
  lineId: string,
  checkoutId: string,
  quantity: number
) => {
  const res = await executeGraphQL(CheckoutUpdateLineDocument, {
    variables: {
      checkoutId,
      lineId,
      quantity,
    },
    cache: "no-cache",
  });

  if (res.checkoutLinesUpdate?.errors[0]) {
    return {
      status: 500,
      message: res.checkoutLinesUpdate?.errors[0].message,
    };
  }

  revalidatePath("/");

  return {
    status: 200,
    message: "Line updated",
  };
};

export const onAddPromoCode = async (checkoutId: string, promoCode: string) => {
  const res = await executeGraphQL(CheckoutAddPromoDocument, {
    variables: {
      checkoutId,
      promoCode,
    },
    cache: "no-cache",
  });

  if (res.checkoutAddPromoCode?.errors[0]) {
    return {
      status: 500,
      message: res.checkoutAddPromoCode?.errors[0].message,
    };
  }

  revalidatePath("/cart");

  return {
    status: 200,
    message: "Promo code added",
  };
};

export const onCheckoutComplete = async (checkoutId: string) => {
  const res = await executeGraphQL(CompleteCheckoutDocument, {
    variables: {
      checkoutId,
    },
    cache: "no-cache",
  });

  if (res.checkoutComplete?.errors[0]) {
    return {
      status: 500,
      message: res.checkoutComplete?.errors[0].message,
    };
  }

  revalidatePath("/cart/checkout");

  return {
    status: 200,
    message: "Order created",
  };
};
