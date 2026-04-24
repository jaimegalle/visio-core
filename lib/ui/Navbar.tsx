"use client";

import React, { useState } from "react";

type NavbarVariant = "light" | "dark";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: NavbarVariant;
  expand?: "sm" | "md" | "lg" | "xl" | "always";
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ variant = "light", expand = "lg", className = "", children, ...props }, ref) => {
    const bgClass = variant === "dark" ? "bg-bs-dark text-white" : "bg-bs-light text-bs-dark";
    return (
      <nav
        ref={ref}
        className={["flex flex-wrap items-center px-4 py-2.5", bgClass, className].join(" ")}
        {...props}
      >
        {children}
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";

interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const NavbarBrand = React.forwardRef<HTMLAnchorElement, NavbarBrandProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={["mr-auto text-lg font-semibold hover:opacity-80", className].join(" ")}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NavbarBrand.displayName = "NavbarBrand";

interface NavbarTogglerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onToggle?: () => void;
}

export const NavbarToggler = React.forwardRef<HTMLButtonElement, NavbarTogglerProps>(
  ({ onToggle, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={["rounded p-2 hover:bg-black/10 md:hidden", className].join(" ")}
        onClick={onToggle}
        aria-label="Toggle navigation"
        {...props}
      >
        {children || (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    );
  }
);
NavbarToggler.displayName = "NavbarToggler";

interface NavbarCollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

export const NavbarCollapse = React.forwardRef<HTMLDivElement, NavbarCollapseProps>(
  ({ isOpen = false, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          "w-full transition-all duration-200 md:flex md:w-auto md:items-center",
          isOpen ? "mt-2 flex flex-col gap-1" : "hidden",
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarCollapse.displayName = "NavbarCollapse";
