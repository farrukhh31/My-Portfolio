"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onValueChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
      <Search
        size={18}
        className="text-zinc-400 flex-shrink-0"
      />

      <Command.Input
        value={value}
        onValueChange={onValueChange}
        autoFocus
        placeholder="Search portfolio..."
        className="
          w-full
          bg-transparent
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          border-none
        "
      />
    </div>
  );
}