"use client";

import React, { useEffect, useCallback } from "react";

type ModalSize = "sm" | "lg" | "xl";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  onClose: () => void;
  size?: ModalSize;
  centered?: boolean;
  backdrop?: boolean | "static";
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ show, onClose, size, centered, backdrop = true, className = "", children, ...props }, ref) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape" && backdrop !== "static") onClose();
      },
      [onClose, backdrop]
    );

    useEffect(() => {
      if (show) {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [show, handleKeyDown]);

    if (!show) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {backdrop && (
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={backdrop !== "static" ? onClose : undefined}
          />
        )}
        <div
          ref={ref}
          className={[
            "relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl",
            size ? sizeClasses[size] : "",
            centered ? "flex items-center" : "",
            className,
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ onClose, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["flex items-center justify-between border-b border-bs-border px-5 py-4", className].join(" ")}
        {...props}
      >
        <h5 className="text-lg font-semibold text-bs-dark">{children}</h5>
        {onClose && (
          <button
            type="button"
            className="ml-auto rounded p-1 text-bs-secondary-500 hover:text-bs-dark hover:bg-bs-secondary-100"
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
ModalHeader.displayName = "ModalHeader";

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={["px-5 py-4", className].join(" ")} {...props}>
        {children}
      </div>
    );
  }
);
ModalBody.displayName = "ModalBody";

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["flex items-center justify-end gap-2 border-t border-bs-border px-5 py-3", className].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ModalFooter.displayName = "ModalFooter";
