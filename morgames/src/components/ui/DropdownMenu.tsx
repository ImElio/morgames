"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { MoreVertical } from "lucide-react";

export type DropdownMenuItem =
  | { type: "separator" }
  | {
      type?: "item";
      label: string;
      icon?: LucideIcon;
      onSelect: () => void;
      destructive?: boolean;
      disabled?: boolean;
    };

interface DropdownMenuProps {
  label: string;
  items: DropdownMenuItem[];
  align?: "start" | "end";
  trigger?: ReactNode;
  triggerClassName?: string;
}

const DEFAULT_TRIGGER_CLASSES = `
  flex h-8 w-8 items-center justify-center rounded-lg
  text-foreground/50 transition-colors
  hover:bg-white/10 hover:text-foreground
  focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-primary
`;

export default function DropdownMenu({
  label,
  items,
  align = "end",
  trigger,
  triggerClassName,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLButtonElement>(
      '[role="menuitem"]:not([disabled])'
    );
    first?.focus();
  }, [open]);

  function focusItem(offset: number) {
    const menuItems = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([disabled])') ??
        []
    );
    if (menuItems.length === 0) return;
    const currentIndex = menuItems.indexOf(document.activeElement as HTMLButtonElement);
    const nextIndex = (currentIndex + offset + menuItems.length) % menuItems.length;
    menuItems[nextIndex]?.focus();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        className={triggerClassName ?? DEFAULT_TRIGGER_CLASSES}
      >
        {trigger ?? <MoreVertical size={16} />}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={label}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              focusItem(1);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              focusItem(-1);
            }
          }}
          className={`
            absolute z-20 mt-1 w-52 overflow-hidden rounded-xl border
            border-white/10 bg-surface py-1 shadow-xl
            ${align === "end" ? "right-0" : "left-0"}
          `}
        >
          {items.map((item, index) =>
            item.type === "separator" ? (
              <div key={`separator-${index}`} role="separator" className="my-1 h-px bg-foreground/10" />
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                  item.onSelect();
                }}
                className={`
                  flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm
                  transition-colors disabled:cursor-not-allowed disabled:opacity-40
                  ${
                    item.destructive
                      ? "text-error hover:bg-error/10"
                      : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                  }
                `}
              >
                {item.icon && <item.icon size={15} />}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
