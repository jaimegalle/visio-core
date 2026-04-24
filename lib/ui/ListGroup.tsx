import React from "react";

type ListGroupItemVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface ListGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  flush?: boolean;
  numbered?: boolean;
}

export const ListGroup = React.forwardRef<HTMLUListElement, ListGroupProps>(
  ({ flush, numbered, className = "", children, ...props }, ref) => {
    const Tag = numbered ? "ol" : "ul";
    return (
      <Tag
        ref={ref as React.Ref<HTMLOListElement>}
        className={[
          "flex flex-col",
          !flush && "rounded-lg border border-bs-border",
          numbered && "list-decimal",
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
ListGroup.displayName = "ListGroup";

interface ListGroupItemProps extends React.HTMLAttributes<HTMLLIElement> {
  variant?: ListGroupItemVariant;
  action?: boolean;
  active?: boolean;
  disabled?: boolean;
  href?: string;
}

const itemVariantClasses: Record<ListGroupItemVariant, string> = {
  primary: "bg-bs-primary-50 text-bs-primary-800",
  secondary: "bg-bs-secondary-50 text-bs-secondary-800",
  success: "bg-bs-success-50 text-bs-success-800",
  danger: "bg-bs-danger-50 text-bs-danger-800",
  warning: "bg-bs-warning-50 text-bs-warning-800",
  info: "bg-bs-info-50 text-bs-info-800",
  light: "bg-bs-light text-bs-dark",
  dark: "bg-bs-dark text-white",
};

export const ListGroupItem = React.forwardRef<HTMLLIElement, ListGroupItemProps>(
  ({ variant, action, active, disabled, href, className = "", children, ...props }, ref) => {
    const classes = [
      "relative block w-full border-b border-bs-border px-4 py-3 text-sm last:border-b-0",
      action
        ? "cursor-pointer transition-colors hover:bg-bs-secondary-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-bs-primary-300"
        : "",
      active ? "z-10 bg-bs-primary text-white border-bs-primary" : "",
      disabled ? "pointer-events-none text-bs-secondary-400" : "",
      !active && variant ? itemVariantClasses[variant] : "",
      !active && !variant && !action ? "bg-white" : "",
      className,
    ].join(" ");

    if (href && !disabled) {
      return (
        <li className="border-b border-bs-border last:border-b-0">
          <a href={href} className={classes}>
            {children}
          </a>
        </li>
      );
    }

    return (
      <li ref={ref} className={classes} aria-disabled={disabled} {...props}>
        {children}
      </li>
    );
  }
);
ListGroupItem.displayName = "ListGroupItem";
