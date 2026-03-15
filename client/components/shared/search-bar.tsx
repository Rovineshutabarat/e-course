"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  displaySize: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "w-[20rem]",
  medium: "w-[25rem]",
  large: "w-[30rem]",
};

const SearchBar = ({ placeholder, displaySize, ...props }: SearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");

  function handleSearch() {
    if (searchKeyword !== undefined) {
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && (!searchKeyword || true)) {
    }
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-2 max-w-full",
        sizeClasses[displaySize],
      )}
    >
      <Input
        type="search"
        placeholder={placeholder}
        className="h-9"
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchKeyword(e.target.value)}
        {...props}
      />
      <Button
        onClick={handleSearch}
        variant="outline"
        size="sm"
        className="h-9 px-3"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
};

export default SearchBar;
