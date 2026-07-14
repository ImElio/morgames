"use client";

import { Search } from "lucide-react";

interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TemplateSearch({ value, onChange }: TemplateSearchProps) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search templates..."
        aria-label="Search templates"
        className="
          w-full rounded-xl border border-white/10 bg-background
          py-2.5 pl-9 pr-3 text-sm text-foreground outline-none
          transition placeholder:text-foreground/30 focus:border-primary
        "
      />
    </div>
  );
}
