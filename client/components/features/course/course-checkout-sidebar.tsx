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
import { CheckCircle2, CreditCard, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CourseCheckoutSidebar = () => {
  const [coupon, setCoupon] = useState("");

  const courseData = {
    price: 499000,
    discountPrice: 149000,
    features: [
      "Akses selamanya",
      "Total 15 Modul Video",
      "Sertifikat Penyelesaian",
      "Update materi gratis",
      "Source code project",
    ],
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-md sticky top-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Ringkasan Pesanan</CardTitle>
        <CardDescription>
          Selesaikan pembayaran untuk mulai belajar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(courseData.discountPrice)}
            </span>
            <span className="text-sm line-through text-muted-foreground">
              {formatPrice(courseData.price)}
            </span>
          </div>
          <p className="text-xs text-green-600 font-medium">
            Hemat{" "}
            {((1 - courseData.discountPrice / courseData.price) * 100).toFixed(
              0,
            )}
            % dengan promo terbatas!
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Sudah termasuk:</p>
          <ul className="space-y-2">
            {courseData.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-t" />

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Punya kode kupon?
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Masukkan kode..."
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

      <CardFooter className="flex flex-col gap-3 border-t pt-6">
        <Link href="/course/asdasd/resource/1" className="w-full">
          <Button
            className="w-full h-11 text-lg font-semibold cursor-pointer"
            size="lg"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Beli Sekarang
          </Button>
        </Link>
        <Button variant="outline" className="w-full h-11" size="lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Tambah ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCheckoutSidebar;
