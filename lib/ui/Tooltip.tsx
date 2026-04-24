"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content: React.ReactNode;
  placement?: TooltipPlacement;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, placement = "top", className = "", children, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const show = useCallback(() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(true), 100);
    }, []);

    const hide = useCallback(() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 100);
    }, []);

    useEffect(() => {
      return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
      <div
        ref={ref}
        className={["relative inline-block", className].join(" ")}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
        {visible && (
          <div
            role="tooltip"
            className={[
              "absolute z-50 max-w-xs rounded bg-bs-dark px-2.5 py-1.5 text-xs text-white whitespace-normal pointer-events-none",
              placementClasses[placement],
            ].join(" ")}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";
