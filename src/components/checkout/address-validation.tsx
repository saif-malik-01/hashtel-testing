"use client";

import { useEffect, useState, useRef } from "react";
import AddressForm from "../shared/address-form";
import { onUpdateCheckoutAddress, onUpdateDeliveryMethod } from "@/actions/cart";
import { CountryCode } from "@/gql/graphql";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export interface Address {
  __typename?: "Address";
  id?: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  city: string;
  countryArea: string;
  postalCode: string;
}

const initialAddress: Address = {
  firstName: "",
  lastName: "",
  streetAddress1: "",
  city: "",
  countryArea: "",
  postalCode: "",
};

export default function AddressValidation({
  address,
  checkoutId,
  defaultShippingMethodId,
  deliveryMethod,
}: {
  address?: Address | null;
  checkoutId: string;
  defaultShippingMethodId: string;
  deliveryMethod?:
    | {
        __typename: "ShippingMethod";
      }
    | {
        __typename: "Warehouse";
      }
    | null
    | undefined;
}) {
  const [formData, setFormData] = useState<Address>(address || initialAddress);
  const router = useRouter();
  const { toast } = useToast();
  const isInitialRender = useRef(true); // Flag to track initial render

  if (!deliveryMethod && defaultShippingMethodId) {
    onUpdateDeliveryMethod(checkoutId, defaultShippingMethodId)
      .then(({ status }) => {
        if (status === 200) router.refresh();
        else throw new Error();
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      });
  }

  const handleUpdate = async () => {
    const isFormDataValid = Object.values(formData).every((value) => value);
    if (!isFormDataValid || formData.postalCode.length !== 6) return;
    delete formData.id;
    const res = await onUpdateCheckoutAddress(
      { ...formData, country: CountryCode.In },
      checkoutId
    );
    if (res.status !== 200) {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: res.message,
      });
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // Skip initial render
      return;
    }

    const timer = setTimeout(() => {
      handleUpdate();
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, checkoutId]);

  return (
    <section>
      <h2 className="mb-4 text-xl font-medium">Address</h2>
      <AddressForm formData={formData} setFormData={setFormData} />
    </section>
  );
}