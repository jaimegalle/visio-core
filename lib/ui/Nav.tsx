"use client";

import React, { useState, createContext, useContext } from "react";

interface NavContextValue {
  activeKey?: string;
  onSelect?: (key: string) => void;
}

const NavCtx = createContext<NavContextValue>({});

interface NavProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  variant?: "tabs" | "pills";
  vertical?: boolean;
  activeKey?: string;
  onSelect?: (key: string) => void;
}

export const Nav = React.forwardRef<HTMLDivElement, NavProps>(
  ({ variant, vertical, activeKey, onSelect, className = "", children, ...props }, ref) => {
    return (
      <NavCtx.Provider value={{ activeKey, onSelect }}>
        <div
          ref={ref}
          className={[
            "flex",
            vertical ? "flex-col" : "flex-row flex-wrap gap-1",
            variant === "tabs" && "border-b border-bs-border",
            className,
          ].join(" ")}
          role="navigation"
          {...props}
        >
          {children}
        </div>
      </NavCtx.Provider>
    );
  }
);
Nav.displayName = "Nav";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavItem = React.forwardRef<HTMLDivElement, NavItemProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);
NavItem.displayName = "NavItem";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventKey?: string;
  active?: boolean;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ eventKey, active: activeProp, className = "", onClick, ...props }, ref) => {
    const ctx = useContext(NavCtx);
    const isActive = activeProp ?? (eventKey !== undefined && ctx.activeKey === eventKey);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (eventKey && ctx.onSelect) ctx.onSelect(eventKey);
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        href="#"
        className={[
          "inline-block rounded px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "text-bs-primary"
            : "text-bs-secondary-600 hover:text-bs-primary hover:bg-bs-secondary-50",
          className,
        ].join(" ")}
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        {...props}
      />
    );
  }
);
NavLink.displayName = "NavLink";
