"use client";

import SearchBar from "@/components/shared/search-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Bell, BookOpen, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const CourseNavbar = () => {
  const router = useRouter();
  const { session, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex justify-between px-10 p-4 shadow-sm sticky top-0 z-50 bg-background items-center">
      <div className="flex items-center gap-x-3">
        <BookOpen />
        <h1 className="text-[20px]">Peak LMS</h1>
      </div>
      <SearchBar placeholder="Search any course..." displaySize="large" />
      <div className="flex items-center gap-x-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-x-5">
            <Bell />
            <ShoppingCart
              onClick={() => router.push("/cart")}
              className="cursor-pointer"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" alt="user profile picture" />
                  <AvatarFallback className="uppercase">
                    {session?.user.username.at(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Fragment>
            <Link href="/auth/login">Sign In</Link>
            <Link href="/auth/register">
              <Button>Sign Up</Button>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CourseNavbar;
