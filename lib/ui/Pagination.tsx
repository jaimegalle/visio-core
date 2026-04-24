import React from "react";

type PaginationSize = "sm" | "lg";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  size?: PaginationSize;
}

const sizeClasses: Record<PaginationSize, string> = {
  sm: "text-xs",
  lg: "text-lg",
};

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ size, className = "", children, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="pagination" {...props}>
        <ul
          className={[
            "flex list-none items-center gap-1",
            size ? sizeClasses[size] : "text-sm",
            className,
          ].join(" ")}
        >
          {children}
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

interface PaginationItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  disabled?: boolean;
}

export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ active, disabled, className = "", children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={[
          active ? "mx-0.5" : "",
          className,
        ].join(" ")}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {children}
      </li>
    );
  }
);
PaginationItem.displayName = "PaginationItem";

interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  disabled?: boolean;
}

export const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ active, disabled, className = "", children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={disabled ? undefined : props.href || "#"}
        className={[
          "inline-flex h-8 min-w-[2rem] items-center justify-center rounded border px-2 transition-colors",
          active
            ? "border-bs-primary bg-bs-primary text-white"
            : "border-bs-border bg-white text-bs-dark hover:bg-bs-secondary-50",
          disabled && "pointer-events-none text-bs-secondary-400",
          className,
        ].join(" ")}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);
PaginationLink.displayName = "PaginationLink";
