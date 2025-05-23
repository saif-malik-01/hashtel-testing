"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Address } from "./address-validation";

interface ShippingFormProps {
  formData: Address;
  setFormData: (data: Address) => void;
  errors: { [key: string]: string };
}

export default function ShippingForm({
  errors,
  formData,
  setFormData,
}: ShippingFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Address</h2>
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
            className={`border-gray-300 focus:ring-red-500 focus:border-red-500 ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
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
            className={`border-gray-300 focus:ring-red-500 focus:border-red-500 ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
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
          className={`border-gray-300 focus:ring-red-500 focus:border-red-500 ${
            errors.streetAddress1 ? "border-red-500" : ""
          }`}
        />
        {errors.streetAddress1 && (
          <p className="text-red-500 text-sm">{errors.streetAddress1}</p>
        )}
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
            className={`border-gray-300 focus:ring-red-500 focus:border-red-500 ${
              errors.city ? "border-red-500" : ""
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-gray-600">
            State
          </Label>
          <Input
            id="state"
            name="countryArea"
            value={formData?.countryArea || ""}
            onChange={handleChange}
            placeholder="Uttarakhand"
            className={`border-gray-300 focus:ring-red-500 focus:border-red-500 ${
              errors.countryArea ? "border-red-500" : ""
            }`}
          />
          {errors.countryArea && (
            <p className="text-red-500 text-sm">{errors.countryArea}</p>
          )}
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
            className={`border-gray-300 focus:ring-red-500 focus:border-red-500 ${
              errors.postalCode ? "border-red-500" : ""
            }`}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm">{errors.postalCode}</p>
          )}
        </div>
      </div>
    </form>
  );
}
