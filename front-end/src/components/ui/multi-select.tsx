
"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  emptyIndicator?: string;
}

export function MultiSelect({ options, placeholder, emptyIndicator }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<{ label: string; value: string }[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: { label: string; value: string }) => {
    setSelected(prev => prev.filter(s => s.value !== item.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          const newSelected = [...selected];
          newSelected.pop();
          setSelected(newSelected);
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  };

  const selectables = options.filter(option => !selected.some(s => s.value === option.value));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((item) => {
            return (
              <Badge key={item.value} variant="secondary">
                {item.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder || "Selecione..."}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.length > 0 ? (
                selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("")
                        setSelected(prev => [...prev, option]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })
              ) : (
                <CommandItem disabled className="cursor-default text-center">
                  {emptyIndicator || "Nenhuma opção encontrada."}
                </CommandItem>
              )}
            </CommandGroup>
          </div>
          : null
        }
      </div>
    </Command>
  )
}
