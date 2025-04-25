import ICICI from "icici-dev";
import { redirect } from "next/navigation";
import * as Checkout from "@/lib/checkout";
import { executeGraphQL } from "@/lib/graphql";
import { CompleteCheckoutDocument } from "@/gql/graphql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const channel = searchParams.get("channel");
  try {
    const icici = new ICICI();
    const paymentResponse = searchParams.get("paymentResponse");
    const res = await icici.checkResponse({
      encKey: process.env.ENCRYPTION_KEY as string,
      saltKey: process.env.SECURE_SECRET as string,
      paymentResponse,
    });
    if (res.status && channel) {
      const checkoutId = await Checkout.getIdFromCookies(channel);
      const res = await executeGraphQL(CompleteCheckoutDocument, {
        variables: {
          checkoutId,
        },
      });
      if (!res.checkoutComplete?.errors[0]) {
        Checkout.deleteId(channel);
        const orderId = res.checkoutComplete?.order?.id;
        return NextResponse.redirect(
          `${process.env.BASE_URL}/${channel}/cart/complete?id=${orderId}`
        );
      }
    }
    return NextResponse.redirect(
      `${process.env.BASE_URL}/${channel}/cart/checkout?error=SERVER_ERROR`
    );
  } catch (error) {
    console.error("Error in payment callback:", error);
    return NextResponse.redirect(
      `${process.env.BASE_URL}/${channel}/cart/checkout?error=SERVER_ERROR`
    );
  }
}
