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
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1.5 pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight">Ringkasan Pesanan</CardTitle>
        <CardDescription className="text-sm">
          Selesaikan pembayaran untuk mulai belajar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[28px] font-bold leading-none tracking-tight">
              {formatPrice(courseData.discountPrice)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(courseData.price)}
            </span>
          </div>
          <p className="text-[13px] font-medium text-emerald-600">
            Hemat{" "}
            {((1 - courseData.discountPrice / courseData.price) * 100).toFixed(
              0,
            )}
            % dengan promo terbatas!
          </p>
          <p className="text-xs text-muted-foreground">
            Akses penuh selamanya, bayar sekali.
          </p>
        </div>

        <div className="space-y-2.5">
          <p className="text-sm font-semibold">Sudah termasuk:</p>
          <ul className="space-y-2">
            {courseData.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="leading-5">{feature}</span>
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

      <CardFooter className="flex flex-col gap-2.5 border-t pt-5">
        <Link href="/course/asdasd/resource/1" className="w-full">
          <Button
            className="h-11 w-full cursor-pointer text-[15px] font-semibold"
            size="lg"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Beli Sekarang
          </Button>
        </Link>
        <Button variant="outline" className="h-11 w-full" size="lg">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Tambah ke Keranjang
        </Button>
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Garansi 30 hari uang kembali
        </p>
      </CardFooter>
    </Card>
  );
};

export default CourseCheckoutSidebar;
