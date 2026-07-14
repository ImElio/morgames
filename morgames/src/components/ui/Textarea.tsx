"use client";

import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string | null;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, id, className = "", ...props },
  ref
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={textareaId} className="text-sm font-medium text-foreground/70">
        {label}
      </label>
      <textarea
        ref={ref}
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`
          w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm text-foreground
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

export default Textarea;
