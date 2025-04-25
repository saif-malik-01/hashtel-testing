"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { onUpdateAddress } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { CountryCode } from "@/gql/graphql";
import AddressForm from "../shared/address-form";
import { Address } from "../checkout/address-validation";

const initialAddress: Address = {
  firstName: "",
  lastName: "",
  streetAddress1: "",
  city: "",
  countryArea: "",
  postalCode: "",
};

export default function AddressCard({
  defaultAddress,
}: {
  defaultAddress?: Address | null;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultAddress);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await onUpdateAddress({
        ...formData,
        country: CountryCode.In,
      });
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
      setLoading(false);
    } catch (error) {}
  };

  return (
    <div className="mt-4 h-fit flex flex-col w-full rounded-[8px] gap-2 border-[#6C7275]">
      <h1 className="col-span-2 mb-6 text-2xl font-semibold leading-8">
        Default Address
      </h1>
      <section>
        <AddressForm
          formData={formData || initialAddress}
          setFormData={setFormData}
        />
        <div className="mt-8 flex gap-4 items-center">
          <Button disabled={loading} onClick={handleSave}>
            Save
          </Button>
        </div>
      </section>
    </div>
  );
}
