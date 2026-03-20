"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
type BaseItem = {
  label: string;
  value?: number;
};

interface ComboboxProps {
  placeholder: string;
  contents: BaseItem[];
  value: number | null;
  onValueChange: (value: number | null) => void;
  actionComponent?: React.ReactNode;
}

export function Combobox({
  placeholder,
  contents,
  value,
  onValueChange,
  actionComponent,
}: ComboboxProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleChange = (val: number | null) => {
    onValueChange?.(val);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? contents.find((content) => content.value === value)?.label
            : `Select a ${placeholder}...`}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No {placeholder} found.</CommandEmpty>
            <CommandGroup>
              {contents.map((content) => (
                <CommandItem
                  key={content.value}
                  value={content.value?.toString()}
                  keywords={[content.label]}
                  className={cn(content.value === value && "bg-accent")}
                  onSelect={(currentValue) => {
                    const id = Number(currentValue);
                    handleChange(id === value ? null : id);
                    setOpen(false);
                  }}
                >
                  {content.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === content.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandList>
            <CommandGroup>
              <CommandItem>{actionComponent && actionComponent}</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
