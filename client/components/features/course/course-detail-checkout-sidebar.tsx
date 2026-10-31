"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/price.formatter";
import { CreditCard, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type CheckoutSidebarProps = { price?: number; };

const CheckoutSidebar = ({ price = 0 }: CheckoutSidebarProps) => {
  const [coupon, setCoupon] = useState("");

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1.5 pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight">Order Summary</CardTitle>
        <CardDescription className="text-sm">
          Complete your payment to start learning
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-3xl font-bold leading-none tracking-tight">
              {formatPrice(price)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Full lifetime access, one-time payment.
          </p>
        </div>

        <hr className="border-t" />

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Have a coupon code?
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter code..."
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="uppercase"
            />
            <Button
              variant="secondary"
              onClick={() => alert(`Applying ${coupon}`)}
            >
              Apply
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2.5 border-t pt-5">
        <Link href="#" className="w-full">
          <Button
            className="h-11 w-full cursor-pointer text-sm font-semibold"
            size="lg"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </Link>
        <Button variant="outline" className="h-11 w-full" size="lg">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <p className="pt-1 text-center text-xs text-muted-foreground">
          30-day money-back guarantee
        </p>
      </CardFooter>
    </Card>
  );
};

export default CheckoutSidebar;
