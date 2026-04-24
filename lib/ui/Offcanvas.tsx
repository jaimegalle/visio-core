"use client";

import React, { useEffect } from "react";

type OffcanvasPlacement = "start" | "end" | "top" | "bottom";

interface OffcanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  onClose: () => void;
  placement?: OffcanvasPlacement;
  backdrop?: boolean;
}

const placementClasses: Record<OffcanvasPlacement, string> = {
  start: "inset-y-0 left-0 w-80",
  end: "inset-y-0 right-0 w-80",
  top: "inset-x-0 top-0 h-64",
  bottom: "inset-x-0 bottom-0 h-64",
};

export const Offcanvas = React.forwardRef<HTMLDivElement, OffcanvasProps>(
  ({ show, onClose, placement = "start", backdrop = true, className = "", children, ...props }, ref) => {
    useEffect(() => {
      if (show) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [show]);

    useEffect(() => {
      if (!show) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [show, onClose]);

    return (
      <>
        {backdrop && show && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
        )}
        <div
          ref={ref}
          className={[
            "fixed z-50 flex flex-col bg-white shadow-xl transition-transform duration-300",
            placementClasses[placement],
            show ? "translate-x-0 translate-y-0" : placement === "start" ? "-translate-x-full" : placement === "end" ? "translate-x-full" : placement === "top" ? "-translate-y-full" : "translate-y-full",
            className,
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          <div className="flex items-center justify-between border-b border-bs-border px-4 py-3">
            <h5 className="text-lg font-semibold text-bs-dark">Offcanvas</h5>
            <button
              type="button"
              className="rounded p-1 text-bs-secondary-500 hover:text-bs-dark hover:bg-bs-secondary-100"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </>
    );
  }
);
Offcanvas.displayName = "Offcanvas";
