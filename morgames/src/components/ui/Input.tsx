"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className = "", ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground/70">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`
          w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground
          outline-none transition placeholder:text-foreground/30
          focus:border-primary
          ${error ? "border-error" : "border-white/10"}
          ${className}
        `}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-xs text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-foreground/40">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
