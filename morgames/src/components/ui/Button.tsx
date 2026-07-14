import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-surface text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
  outline: "border border-foreground/15 text-foreground/80 hover:bg-white/5 hover:text-foreground",
  ghost: "text-foreground/60 hover:bg-white/5 hover:text-foreground",
  destructive: "bg-error text-white hover:bg-error/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 rounded-lg px-3 text-sm",
  md: "h-11 gap-2 rounded-xl px-5 text-sm",
  icon: "h-10 w-10 rounded-xl justify-center",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className = "", type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`
        inline-flex items-center font-medium
        transition-colors duration-150
        outline-none focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-primary
        disabled:cursor-not-allowed disabled:opacity-40 disabled:saturate-0
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    />
  );
});

export default Button;
