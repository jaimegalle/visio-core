"use client";

import React, { useState, useEffect, useRef } from "react";

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ in: isOpen = false, className = "", children, ...props }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | "auto">(isOpen ? "auto" : 0);

    useEffect(() => {
      if (isOpen) {
        const el = contentRef.current;
        if (el) {
          setHeight(el.scrollHeight);
          const timer = setTimeout(() => setHeight("auto"), 300);
          return () => clearTimeout(timer);
        }
      } else {
        const el = contentRef.current;
        if (el) {
          setHeight(el.scrollHeight);
          requestAnimationFrame(() => {
            setHeight(0);
          });
        }
      }
    }, [isOpen]);

    return (
      <div
        ref={(node) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["overflow-hidden transition-[height] duration-300 ease-in-out", className].join(" ")}
        style={{ height: height === "auto" ? undefined : height }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Collapse.displayName = "Collapse";
