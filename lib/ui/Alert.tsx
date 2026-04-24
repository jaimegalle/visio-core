"use client";

import React, { useState, useCallback } from "react";

type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  dismissible?: boolean;
  onClose?: () => void;
  show?: boolean;
}

const variantClasses: Record<AlertVariant, string> = {
  primary: "bg-bs-primary-50 text-bs-primary-800 border-bs-primary-200",
  secondary: "bg-bs-secondary-50 text-bs-secondary-800 border-bs-secondary-200",
  success: "bg-bs-success-50 text-bs-success-800 border-bs-success-200",
  danger: "bg-bs-danger-50 text-bs-danger-800 border-bs-danger-200",
  warning: "bg-bs-warning-50 text-bs-warning-800 border-bs-warning-200",
  info: "bg-bs-info-50 text-bs-info-800 border-bs-info-200",
  light: "bg-bs-light text-bs-dark border-bs-secondary-200",
  dark: "bg-bs-dark text-white border-bs-dark",
};

const closeVariantClasses: Record<AlertVariant, string> = {
  primary: "text-bs-primary-800 hover:text-bs-primary-400",
  secondary: "text-bs-secondary-800 hover:text-bs-secondary-400",
  success: "text-bs-success-800 hover:text-bs-success-400",
  danger: "text-bs-danger-800 hover:text-bs-danger-400",
  warning: "text-bs-warning-800 hover:text-bs-warning-400",
  info: "text-bs-info-800 hover:text-bs-info-400",
  light: "text-bs-dark hover:text-bs-secondary-600",
  dark: "text-white hover:text-bs-secondary-400",
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "primary", dismissible, onClose, show = true, className = "", children, ...props }, ref) => {
    const [visible, setVisible] = useState(show);

    const handleClose = useCallback(() => {
      setVisible(false);
      onClose?.();
    }, [onClose]);

    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={[
          "relative flex items-start gap-3 rounded border p-4",
          variantClasses[variant],
          className,
        ].join(" ")}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            type="button"
            className={[
              "ml-auto inline-flex shrink-0 items-center justify-center rounded p-1 text-lg leading-none transition-colors",
              closeVariantClasses[variant],
            ].join(" ")}
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
