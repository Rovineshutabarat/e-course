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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavbarProps = {
  title?: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const router = useRouter();
  const { session, isAuthenticated, logout } = useAuth();

  return (
    <div className="container mx-auto py-2 px-4 flex justify-between items-center">
      <div className="flex items-center text-sm min-w-0">
        <Button
          variant="link"
          className="p-0 mr-2 cursor-pointer shrink-0"
          onClick={() => router.push("/courses")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Button>
        <span className="text-muted-foreground mx-2 shrink-0">|</span>
        <span className="text-muted-foreground truncate font-medium">
          {title ?? "Course Detail"}
        </span>
      </div>

      <div className="flex items-center gap-x-4 shrink-0">
        <div className="flex items-center pr-4 border-r gap-x-1">
          <ThemeToggle className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring/40" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground cursor-pointer"
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
                className="h-8 w-8 text-muted-foreground cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share this course</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Your Shopping Cart</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-x-3 pl-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-x-2">
              <p className="text-sm">{session?.user.username}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer border">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xs uppercase">
                      {session?.user.username.at(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push("profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-x-4 text-sm font-medium">
              <Link href="/auth/login" className="hover:text-primary">
                Sign In
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
