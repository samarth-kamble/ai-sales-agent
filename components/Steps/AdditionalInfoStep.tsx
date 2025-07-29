import React from "react";
import { Info } from "lucide-react";

import { useWebinarStore } from "@/hooks/useWebinarStore";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const AdditionalInfoStep = () => {
  const { formData, updateAdditionalInfoField, getStepValidationErrors } =
    useWebinarStore();
  const { lockChat, couponCode, couponEnabled } = formData.additionalInfo;

  const handleToggleLockChat = (checked: boolean) => {
    updateAdditionalInfoField("lockChat", checked);
  };

  const handleToggleCoupon = (checked: boolean) => {
    updateAdditionalInfoField("couponEnabled", checked);
  };

  const errors = getStepValidationErrors("additionalInfo");

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAdditionalInfoField("couponCode", e.target.value);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="lock-chat" className="text-base font-medium">
            Lock Chat
          </Label>
          <p className="text-sm text-gray-400">
            Turn it on to make chat visible to your users at all time.
          </p>
        </div>
        <Switch
          id="lock-chat"
          checked={lockChat || false}
          onCheckedChange={handleToggleLockChat}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="coupon-code" className="text-base font-medium">
              Coupon Code
            </Label>
            <p className="text-sm text-gray-400">
              Turn it on to offer a discount to your users.
            </p>
          </div>
          <Switch
            id="coupon-enabled"
            checked={couponEnabled || false}
            onCheckedChange={handleToggleCoupon}
          />
        </div>
        {couponEnabled && (
          <div className="space-y-2">
            <Label htmlFor="coupon-code" className="text-sm font-medium">
              Coupon Code
            </Label>
            <Input
              id="coupon-code"
              value={couponCode || ""}
              onChange={handleCouponCodeChange}
              placeholder="Paste your coupon code here"
              className={cn(
                "!bg-background/50 border border-input",
                errors.couponCode && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.couponCode && (
              <p className="text-sm text-red-500">{errors.couponCode}</p>
            )}
            <div className="flex items-start gap-2 text-sm">
              <Info className="h-4 w-4 mt-0.5" />
              <p>
                This coupon code can be used to promote a sale. Users can use it
                for the buy now CTA.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfoStep;
