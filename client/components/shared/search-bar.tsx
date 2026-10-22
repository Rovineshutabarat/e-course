"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  displaySize: "small" | "medium" | "large";
  defaultValue?: string;
  onSearch?: (keyword: string) => void;
}

const sizeClasses = {
  small: "w-[20rem]",
  medium: "w-[25rem]",
  large: "w-[30rem]",
};

const SearchBar = ({
  placeholder,
  displaySize,
  defaultValue,
  onSearch,
  ...props
}: SearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = React.useState<string>(
    defaultValue ?? "",
  );

  React.useEffect(() => {
    setSearchKeyword(defaultValue ?? "");
  }, [defaultValue]);

  function handleSearch() {
    onSearch?.(searchKeyword.trim());
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const wasNonEmpty = searchKeyword !== "";
    setSearchKeyword(value);

    if (value === "" && wasNonEmpty) {
      onSearch?.("");
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
        value={searchKeyword}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
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
