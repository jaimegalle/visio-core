import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark"
  | "link";

type ButtonSize = "sm" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-bs-primary text-white hover:bg-bs-primary-700 focus:ring-bs-primary-300 active:bg-bs-primary-800",
  secondary:
    "bg-bs-secondary text-white hover:bg-bs-secondary-700 focus:ring-bs-secondary-300 active:bg-bs-secondary-800",
  success:
    "bg-bs-success text-white hover:bg-bs-success-700 focus:ring-bs-success-300 active:bg-bs-success-800",
  danger:
    "bg-bs-danger text-white hover:bg-bs-danger-700 focus:ring-bs-danger-300 active:bg-bs-danger-800",
  warning:
    "bg-bs-warning text-bs-dark hover:bg-bs-warning-700 focus:ring-bs-warning-300 active:bg-bs-warning-800",
  info: "bg-bs-info text-bs-dark hover:bg-bs-info-700 focus:ring-bs-info-300 active:bg-bs-info-800",
  light:
    "bg-bs-light text-bs-dark hover:bg-bs-secondary-100 focus:ring-bs-secondary-200 active:bg-bs-secondary-200",
  dark: "bg-bs-dark text-white hover:bg-bs-secondary-800 focus:ring-bs-secondary-500 active:bg-bs-secondary-900",
  "outline-primary":
    "border border-bs-primary-600 text-bs-primary-600 hover:bg-bs-primary hover:text-white focus:ring-bs-primary-300",
  "outline-secondary":
    "border border-bs-secondary-600 text-bs-secondary-600 hover:bg-bs-secondary hover:text-white focus:ring-bs-secondary-300",
  "outline-success":
    "border border-bs-success-600 text-bs-success-600 hover:bg-bs-success hover:text-white focus:ring-bs-success-300",
  "outline-danger":
    "border border-bs-danger-600 text-bs-danger-600 hover:bg-bs-danger hover:text-white focus:ring-bs-danger-300",
  "outline-warning":
    "border border-bs-warning-600 text-bs-warning-600 hover:bg-bs-warning hover:text-bs-dark focus:ring-bs-warning-300",
  "outline-info":
    "border border-bs-info-600 text-bs-info-600 hover:bg-bs-info hover:text-bs-dark focus:ring-bs-info-300",
  "outline-light":
    "border border-bs-light text-bs-light hover:bg-bs-light hover:text-bs-dark focus:ring-bs-secondary-200",
  "outline-dark":
    "border border-bs-dark text-bs-dark hover:bg-bs-dark hover:text-white focus:ring-bs-secondary-500",
  link: "text-bs-primary hover:underline focus:ring-bs-primary-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  lg: "px-4 py-2.5 text-lg",
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ variant = "primary", size, active, disabled, className = "", href, children, ...props }, ref) => {
  const base =
    "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const classes = [
    base,
    variantClasses[variant],
    size ? sizeClasses[size] : "px-3 py-1.5",
    active ? "ring-2 ring-offset-2" : "",
    disabled || props["aria-disabled"]
      ? "opacity-65 pointer-events-none"
      : "",
    variant === "link" ? "bg-transparent border-none p-0 h-auto" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        aria-disabled={disabled}
        role="button"
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled}
      aria-pressed={active}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
