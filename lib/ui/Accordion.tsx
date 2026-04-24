"use client";

import React, { useState, createContext, useContext } from "react";

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
  alwaysOpen: boolean;
}

const AccordionCtx = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  return useContext(AccordionCtx);
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  flush?: boolean;
  alwaysOpen?: boolean;
  defaultOpen?: string[];
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ flush, alwaysOpen = false, defaultOpen = [], className = "", children, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

    const toggle = (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!alwaysOpen) next.clear();
          next.add(id);
        }
        return next;
      });
    };

    return (
      <AccordionCtx.Provider value={{ openItems, toggle, alwaysOpen }}>
        <div
          ref={ref}
          className={[
            "flex flex-col",
            !flush && "rounded-lg border border-bs-border",
            flush && "border-t border-bs-border",
            className,
          ].join(" ")}
          {...props}
        >
          {children}
        </div>
      </AccordionCtx.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  itemId: string;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ itemId, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["border-b border-bs-border last:border-b-0", className].join(" ")}
        data-accordion-item={itemId}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

interface AccordionHeaderProps extends React.HTMLAttributes<HTMLButtonElement> {
  itemId: string;
}

export const AccordionHeader = React.forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ itemId, className = "", children, ...props }, ref) => {
    const ctx = useAccordion();
    if (!ctx) throw new Error("AccordionHeader must be inside Accordion");

    const isOpen = ctx.openItems.has(itemId);

    return (
      <button
        ref={ref}
        type="button"
        className={[
          "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-bs-dark transition-colors hover:bg-bs-secondary-50",
          isOpen && "bg-bs-secondary-50",
          className,
        ].join(" ")}
        onClick={() => ctx.toggle(itemId)}
        aria-expanded={isOpen}
        {...props}
      >
        <span>{children}</span>
        <svg
          className={[
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          ].join(" ")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }
);
AccordionHeader.displayName = "AccordionHeader";

interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  itemId: string;
}

export const AccordionBody = React.forwardRef<HTMLDivElement, AccordionBodyProps>(
  ({ itemId, className = "", children, ...props }, ref) => {
    const ctx = useAccordion();
    if (!ctx) throw new Error("AccordionBody must be inside Accordion");

    const isOpen = ctx.openItems.has(itemId);

    return (
      <div
        ref={ref}
        className={[
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
          className,
        ].join(" ")}
        {...props}
      >
        <div className="px-4 py-3 text-sm text-bs-secondary-700">{children}</div>
      </div>
    );
  }
);
AccordionBody.displayName = "AccordionBody";
