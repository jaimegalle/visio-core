import React from "react";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="breadcrumb" {...props}>
        <ol
          className={["flex flex-wrap items-center gap-1.5 text-sm", className].join(" ")}
        >
          {children}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  href?: string;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ active, href, className = "", children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={[
          "flex items-center gap-1.5",
          active ? "text-bs-secondary-500" : "",
          className,
        ].join(" ")}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {active ? (
          <span>{children}</span>
        ) : (
          <>
            <a href={href} className="text-bs-primary hover:underline">
              {children}
            </a>
            <span className="text-bs-secondary-400">/</span>
          </>
        )}
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
