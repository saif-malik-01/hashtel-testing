"use server";

import {
  CheckoutAssignDocument,
  CurrentUserDocument,
  RegisterUserDocument,
  UpdateUserDocument,
} from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";
import { getServerAuthClient } from "@/lib/client";
import { executeGraphQL } from "@/lib/graphql";
import { redirect } from "next/navigation";

export const onSignIn = async (
  channel: string,
  redirectedUrl: string | undefined,
  formData: FormData
) => {
  let url = "";
  
  try {
    const res = await (
      await getServerAuthClient()
    ).signIn(
      {
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
      },
      { cache: "no-store" }
    );

    const { me } = await executeGraphQL(CurrentUserDocument, {});

    if (!me) {
      return { status: 500, message: "Server error" };
    }

    const checkoutId = await Checkout.getIdFromCookies(channel);
    if (!me.checkoutIds?.includes(checkoutId)) {
      await executeGraphQL(CheckoutAssignDocument, {
        variables: {
          checkoutId: checkoutId,
          customerId: me.id,
        },
      });
    }

    if (res.data.tokenCreate) {
      url = `/${channel}`;
    }

    if (redirectedUrl) {
      url = redirectedUrl;
    }

    return { status: 500, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: (error as Error).message };
  } finally {
    if (url) redirect(url);
  }
};

export const onRegister = async (
  redirectedUrl: string | undefined,
  channel: string,
  formData: FormData
) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";

  const data = await executeGraphQL(RegisterUserDocument, {
    variables: {
      channel,
      email,
      password,
      firstName,
      lastName,
      phoneNumber
      // redirectUrl: `${
      //   process.env.BASE_URL
      // }/${channel}/account-confirm${
      //   redirectedUrl ? `?redirect=${redirectedUrl}` : ""
      // }`,
    },
  });

  if (data.accountRegister?.user) {
    redirect(
      `/${channel}/sign-in${redirectedUrl ? `?redirect=${redirectedUrl}` : ""}`
    );
  }

  return data.accountRegister?.errors;
};

export const onUpdateUser = async (formData: FormData) => {
  const phoneNumber = formData.get("email")?.toString();
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();

  if (!firstName || !lastName) {
    return { status: 500, message: "Complete data required" };
  }

  const data = await executeGraphQL(UpdateUserDocument, {
    variables: {
      updates: {
        firstName,
        lastName,
        metadata: [{ key: "phoneNumber", value: phoneNumber || "" }],
      },
    },
  });

  if (data.accountUpdate?.errors[0]) {
    return { status: 500, message: data.accountUpdate?.errors[0].message };
  }

  return { status: 200, message: "User updated" };
};

export const onUpdateAddress = async (address: any) => {
  const billingRes = await executeGraphQL(UpdateUserDocument, {
    variables: {
      updates: {
        defaultBillingAddress: address,
      },
    },
    withAuth: true,
  });

  const shippingRes = await executeGraphQL(UpdateUserDocument, {
    variables: {
      updates: {
        defaultShippingAddress: address,
      },
    },
    withAuth: true,
  });

  if (
    shippingRes.accountUpdate?.errors[0] ||
    billingRes.accountUpdate?.errors[0]
  ) {
    return {
      status: 500,
      message:
        shippingRes.accountUpdate?.errors[0].message ||
        billingRes.accountUpdate?.errors[0].message,
    };
  }

  return {
    status: 200,
    message: "Address updated",
  };
};

export const onLogout = async () => {
  await (await getServerAuthClient()).signOut();
};
