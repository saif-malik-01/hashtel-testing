"use client";

import { useSearchParams, useRouter } from "next/navigation";
import BillingForm from "./billing-form";
import ShippingForm from "./shipping-form";

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sameAsShipping = searchParams.get("same") !== "false";

  const setUseShippingForBilling = (value: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("same", value.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="w-1/2 flex flex-col gap-8">
      <ShippingForm />
      <BillingForm
        useShippingForBilling={sameAsShipping}
        setUseShippingForBilling={setUseShippingForBilling}
      />
    </section>
  );
}
