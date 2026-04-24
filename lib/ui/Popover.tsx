"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

type PopoverPlacement = "top" | "bottom" | "left" | "right";

interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "content"> {
  title?: React.ReactNode;
  content: React.ReactNode;
  placement?: PopoverPlacement;
}

const placementClasses: Record<PopoverPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ title, content, placement = "top", className = "", children, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggle = useCallback(() => setVisible((v) => !v), []);

    useEffect(() => {
      if (!visible) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setVisible(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [visible]);

    return (
      <div ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }} className={["relative inline-block", className].join(" ")} {...props}>
        <div onClick={toggle} className="cursor-pointer">
          {children}
        </div>
        {visible && (
          <div
            className={[
              "absolute z-50 w-64 rounded-lg border border-bs-border bg-white shadow-lg",
              placementClasses[placement],
            ].join(" ")}
          >
            {title && (
              <div className="border-b border-bs-border px-3 py-2 text-sm font-semibold text-bs-dark">
                {title}
              </div>
            )}
            <div className="px-3 py-2 text-sm text-bs-secondary-700">{content}</div>
          </div>
        )}
      </div>
    );
  }
);
Popover.displayName = "Popover";
