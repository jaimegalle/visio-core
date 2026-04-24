import React from "react";

type ProgressVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info";

const variantClasses: Record<ProgressVariant, string> = {
  primary: "bg-bs-primary",
  secondary: "bg-bs-secondary",
  success: "bg-bs-success",
  danger: "bg-bs-danger",
  warning: "bg-bs-warning",
  info: "bg-bs-info",
};

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  min?: number;
  max?: number;
  variant?: ProgressVariant;
  striped?: boolean;
  animated?: boolean;
  height?: string;
  label?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, min = 0, max = 100, variant = "primary", striped, animated, height, label, className = "", ...props }, ref) => {
    const pct = Math.round(((value - min) / (max - min)) * 100);

    return (
      <div
        ref={ref}
        className={["overflow-hidden rounded-full bg-bs-secondary-200", height ? "" : "h-2.5", className].join(" ")}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        style={height ? { height } : undefined}
        {...props}
      >
        <div
          className={[
            "flex h-full items-center justify-center rounded-full text-xs font-medium text-white transition-all",
            variantClasses[variant],
            striped || animated ? "bg-[length:1rem_1rem]" : "",
            animated ? "animate-[progress-bar-stripes_1s_linear_infinite]" : "",
            striped && !animated
              ? "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]"
              : "",
          ].join(" ")}
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        >
          {label && <span>{label}</span>}
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";
