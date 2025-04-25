"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { State } from "country-state-city";
import { Address } from "../checkout/address-validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ShippingFormProps {
  formData: Address;
  setFormData: (data: Address) => void;
}

export default function AddressForm({
  formData,
  setFormData,
}: ShippingFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first-name" className="text-gray-600">
            First name
          </Label>
          <Input
            id="first-name"
            name="firstName"
            value={formData?.firstName || ""}
            onChange={handleChange}
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name" className="text-gray-600">
            Last name
          </Label>
          <Input
            id="last-name"
            name="lastName"
            value={formData?.lastName || ""}
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address" className="text-gray-600">
          Address Line
        </Label>
        <Input
          id="address"
          name="streetAddress1"
          value={formData?.streetAddress1 || ""}
          onChange={handleChange}
          placeholder="123 Main St"
        />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-gray-600">
            City
          </Label>
          <Input
            id="city"
            name="city"
            value={formData?.city || ""}
            onChange={handleChange}
            placeholder="Greater Noida"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-gray-600">
            City
          </Label>
          <Select
            defaultValue={formData?.countryArea}
            onValueChange={(val) =>
              setFormData({ ...formData, countryArea: val })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {State.getStatesOfCountry("IN").map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-gray-600">
            ZIP Code
          </Label>
          <Input
            id="zip"
            name="postalCode"
            value={formData?.postalCode || ""}
            onChange={handleChange}
            placeholder="10001"
            min={6}
          />
        </div>
      </div>
    </form>
  );
}
