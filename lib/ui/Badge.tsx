import React from "react";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pill?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-bs-primary text-white",
  secondary: "bg-bs-secondary text-white",
  success: "bg-bs-success text-white",
  danger: "bg-bs-danger text-white",
  warning: "bg-bs-warning text-bs-dark",
  info: "bg-bs-info text-bs-dark",
  light: "bg-bs-light text-bs-dark",
  dark: "bg-bs-dark text-white",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", pill, className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={[
          "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold leading-5",
          pill ? "rounded-full" : "rounded",
          variantClasses[variant],
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
