import React from "react";

type SpinnerVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

type SpinnerType = "border" | "grow";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SpinnerVariant;
  type?: SpinnerType;
  size?: "sm";
}

const variantBorderClasses: Record<SpinnerVariant, string> = {
  primary: "border-bs-primary",
  secondary: "border-bs-secondary",
  success: "border-bs-success",
  danger: "border-bs-danger",
  warning: "border-bs-warning",
  info: "border-bs-info",
  light: "border-bs-light",
  dark: "border-bs-dark",
};

const variantGrowClasses: Record<SpinnerVariant, string> = {
  primary: "bg-bs-primary",
  secondary: "bg-bs-secondary",
  success: "bg-bs-success",
  danger: "bg-bs-danger",
  warning: "bg-bs-warning",
  info: "bg-bs-info",
  light: "bg-bs-light",
  dark: "bg-bs-dark",
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ variant = "primary", type = "border", size, className = "", ...props }, ref) => {
    const sizeClass = size ? "w-4 h-4" : "w-8 h-8";

    if (type === "grow") {
      return (
        <div
          ref={ref}
          role="status"
          className={[
            "inline-block animate-pulse rounded-full",
            sizeClass,
            variantGrowClasses[variant],
            className,
          ].join(" ")}
          {...props}
        >
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="status"
        className={[
          "inline-block animate-spin rounded-full border-[0.25em] border-r-transparent",
          sizeClass,
          variantBorderClasses[variant],
          className,
        ].join(" ")}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
