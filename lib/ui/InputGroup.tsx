import React from "react";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "lg";
}

const sizeClasses = {
  sm: "text-xs",
  lg: "text-lg",
};

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ size, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["flex items-stretch", size ? sizeClasses[size] : "", className].join(" ")}
        {...props}
      >
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) return child;
          const isFirst = i === 0;
          const isLast = i === React.Children.count(children) - 1;
          const roundedClass = isFirst
            ? "rounded-l"
            : isLast
              ? "rounded-r"
              : "";
          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: [roundedClass, (child as React.ReactElement<{ className?: string }>).props.className].filter(Boolean).join(" "),
          });
        })}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

interface InputGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={["flex items-center whitespace-nowrap rounded border border-bs-border bg-bs-secondary-50 px-3 py-1.5 text-sm text-bs-dark", className].join(" ")}
        {...props}
      >
        {children}
      </span>
    );
  }
);
InputGroupText.displayName = "InputGroupText";
