"use client";

import SearchBar from "@/components/shared/search-bar";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { useCourseFilters } from "@/hooks/use-course-filters";
import { BookOpen, Heart, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CourseNavbar = () => {
  const router = useRouter();
  const { session, isAuthenticated, logout } = useAuth();
  const { filters, setFilters } = useCourseFilters();
  const [mobileKeyword, setMobileKeyword] = React.useState(filters.slug ?? "");

  React.useEffect(() => {
    setMobileKeyword(filters.slug ?? "");
  }, [filters.slug]);

  function commitSearch(keyword: string) {
    const slug = keyword.trim();
    setFilters({ slug: slug === "" ? undefined : slug });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-full items-center gap-3 sm:gap-4 ">
        <button
          onClick={() => router.push("/course/list")}
          className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          aria-label="Peak LMS - back to course list"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <BookOpen className="h-[18px] w-[18px]" />
          </span>
          <span className="hidden text-[17px] font-bold tracking-tight min-[400px]:block">
            Peak<span className="text-primary"> LMS</span>
          </span>
        </button>

        <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
          <SearchBar
            placeholder="Search any course..."
            displaySize="large"
            defaultValue={filters.slug}
            onSearch={commitSearch}
          />
        </div>

        <nav
          aria-label="Course actions"
          className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1"
        >
          <ThemeToggle className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring/40" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Add to wishlist"
                className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring/40"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to wishlist</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Your shopping cart, 2 items"
                className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring/40"
              >
                <ShoppingCart className="h-4 w-4" />
                {/* TODO: connect to cart store */}
                <span className="absolute right-0 top-1 grid size-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                  2
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Your Shopping Cart</TooltipContent>
          </Tooltip>

          <div aria-hidden className="mx-2 h-6 w-px bg-border" />

          {isAuthenticated ? (
            <div className="flex items-center gap-x-2">
              <p className="hidden max-w-28 truncate text-sm font-medium sm:block">
                {session?.user.username}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-5 w-5 cursor-pointer ring-1 ring-primary/20 ring-offset-1 ring-offset-background">
                    <AvatarImage src="" alt={session?.user.username} />
                    <AvatarFallback className="text-xs uppercase">
                      {session?.user.username.at(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => router.push("profile")}
                    className="cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={logout}
                    className="cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-x-2 sm:gap-x-3">
              <Link
                href="/auth/login"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Sign In
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="rounded-full px-5 shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>

      <div className="border-t border-border/60 px-4 pb-3 pt-2 md:hidden">
        <form
          role="search"
          className="relative w-full"
          onSubmit={(e) => {
            e.preventDefault();
            commitSearch(mobileKeyword);
          }}
        >
          <label htmlFor="course-search-mobile" className="sr-only">
            Search courses
          </label>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            id="course-search-mobile"
            type="search"
            placeholder="Search any course..."
            value={mobileKeyword}
            onChange={(e) => setMobileKeyword(e.target.value)}
            className="h-10 w-full rounded-full border-transparent bg-muted/70 pl-10 pr-4 text-sm shadow-none focus-visible:border-ring focus-visible:bg-background"
          />
        </form>
      </div>
    </header>
  );
};

export default CourseNavbar;
