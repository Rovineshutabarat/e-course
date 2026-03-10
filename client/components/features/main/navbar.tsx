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
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

type Link = {
  name: string;
  href: string;
};

const Navbar = () => {
  const links: Link[] = [
    { name: "Homepage", href: "/" },
    { name: "Courses", href: "/course/list" },
    { name: "Blogs", href: "/" },
    { name: "About", href: "/" },
    { name: "Contact", href: "/" },
  ];

  const { session, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  return (
    <header className="p-5 space-x-20 shadow-sm flex justify-around items-center border-b bg-card/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-x-3">
        <BookOpen />
        <h1 className="text-[20px]">Kontol</h1>
      </div>
      <ul className="flex items-center gap-x-7">
        {links.map((link: Link, index: number) => {
          return (
            <Link href={link.href} key={index}>
              {link.name}
            </Link>
          );
        })}
      </ul>
      <div className="flex items-center gap-x-3">
        {isAuthenticated ? (
          <Fragment>
            <p>{session?.user.username}</p>
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
          </Fragment>
        ) : (
          <Fragment>
            <Link href="/auth/login">Sign In</Link>
            <Link href="/auth/register">
              <Button>Sign Up</Button>
            </Link>
          </Fragment>
        )}
      </div>
    </header>
  );
};

export default Navbar;
