"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

type DropdownDirection = "down" | "up" | "start" | "end";

interface DropdownRenderProps {
  open: boolean;
  toggle: () => void;
  direction: DropdownDirection;
}

interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  direction?: DropdownDirection;
  children: React.ReactNode | ((props: DropdownRenderProps) => React.ReactNode);
}

const directionClasses: Record<DropdownDirection, string> = {
  down: "top-full left-0 mt-1",
  up: "bottom-full left-0 mb-1",
  start: "right-full top-0 mr-1",
  end: "left-full top-0 ml-1",
};

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ direction = "down", className = "", children, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggle = useCallback(() => setOpen((v) => !v), []);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["relative inline-block", className].join(" ")}
        {...props}
      >
        {typeof children === "function" ? children({ open, toggle, direction }) : children}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

interface DropdownToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onToggle?: () => void;
  open?: boolean;
}

export const DropdownToggle = React.forwardRef<HTMLButtonElement, DropdownToggleProps>(
  ({ onToggle, open, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={["inline-flex items-center gap-1", className].join(" ")}
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        {...props}
      >
        {children}
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }
);
DropdownToggle.displayName = "DropdownToggle";

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  direction?: DropdownDirection;
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ show, direction = "down", className = "", children, ...props }, ref) => {
    if (!show) return null;
    return (
      <div
        ref={ref}
        className={[
          "absolute z-50 min-w-[10rem] rounded-lg border border-bs-border bg-white py-1 shadow-lg",
          directionClasses[direction],
          className,
        ].join(" ")}
        role="menu"
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenu.displayName = "DropdownMenu";

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ href, active, disabled, className = "", children, ...props }, ref) => {
    const classes = [
      "block w-full px-4 py-2 text-left text-sm transition-colors",
      active
        ? "bg-bs-primary-50 text-bs-primary"
        : "text-bs-dark hover:bg-bs-secondary-50",
      disabled && "pointer-events-none text-bs-secondary-400",
      className,
    ].join(" ");

    if (href && !disabled) {
      return (
        <a href={href} className={classes} role="menuitem">
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled} role="menuitem" {...props}>
        {children}
      </button>
    );
  }
);
DropdownItem.displayName = "DropdownItem";

interface DropdownDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownDivider = React.forwardRef<HTMLDivElement, DropdownDividerProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={["my-1 border-t border-bs-border", className].join(" ")} {...props} />
  )
);
DropdownDivider.displayName = "DropdownDivider";

interface DropdownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownHeader = React.forwardRef<HTMLDivElement, DropdownHeaderProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={["px-4 py-2 text-xs font-semibold text-bs-secondary-500", className].join(" ")} {...props}>
      {children}
    </div>
  )
);
DropdownHeader.displayName = "DropdownHeader";
