"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className={cn("cursor-pointer", className)}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
