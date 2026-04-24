"use client";

import React, { useEffect, useState, useCallback } from "react";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  onClose?: () => void;
  autohide?: boolean;
  delay?: number;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ show: showProp = true, onClose, autohide, delay = 5000, className = "", children, ...props }, ref) => {
    const [show, setShow] = useState(showProp);

    useEffect(() => {
      setShow(showProp);
    }, [showProp]);

    useEffect(() => {
      if (show && autohide) {
        const timer = setTimeout(() => {
          setShow(false);
          onClose?.();
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [show, autohide, delay, onClose]);

    if (!show) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={[
          "pointer-events-auto w-full max-w-sm rounded-lg border border-bs-border bg-white shadow-lg transition-all",
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Toast.displayName = "Toast";

interface ToastHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export const ToastHeader = React.forwardRef<HTMLDivElement, ToastHeaderProps>(
  ({ onClose, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["flex items-center justify-between border-b border-bs-border px-3 py-2", className].join(" ")}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-bs-dark">{children}</div>
        {onClose && (
          <button
            type="button"
            className="rounded p-0.5 text-bs-secondary-500 hover:text-bs-dark"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        )}
      </div>
    );
  }
);
ToastHeader.displayName = "ToastHeader";

interface ToastBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastBody = React.forwardRef<HTMLDivElement, ToastBodyProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={["px-3 py-2 text-sm text-bs-dark", className].join(" ")} {...props}>
        {children}
      </div>
    );
  }
);
ToastBody.displayName = "ToastBody";
