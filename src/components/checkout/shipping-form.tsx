import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

export default function ShippingForm() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Shipping Information
        </h2>
        <Button>Save</Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first-name" className="text-gray-600">
            First name
          </Label>
          <Input
            id="first-name"
            placeholder="John"
            className="border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name" className="text-gray-600">
            Last name
          </Label>
          <Input
            id="last-name"
            placeholder="Doe"
            className="border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address" className="text-gray-600">
          Address Line
        </Label>
        <Input
          id="address"
          placeholder="123 Main St"
          className="border-gray-300 focus:ring-red-500 focus:border-red-500"
        />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-gray-600">
            City
          </Label>
          <Input
            id="city"
            placeholder="Greater Noida"
            className="border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-gray-600">
            State
          </Label>
          <Input
            id="state"
            placeholder="Uttarakhand"
            className="border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-gray-600">
            ZIP Code
          </Label>
          <Input
            id="zip"
            placeholder="10001"
            className="border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );
}
