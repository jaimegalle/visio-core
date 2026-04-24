import React from "react";

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "white";
}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ variant, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={[
          "inline-flex h-8 w-8 items-center justify-center rounded text-xl leading-none transition-colors",
          variant === "white"
            ? "text-white hover:bg-white/20"
            : "text-bs-dark hover:bg-bs-secondary-100",
          className,
        ].join(" ")}
        aria-label="Close"
        {...props}
      >
        &times;
      </button>
    );
  }
);
CloseButton.displayName = "CloseButton";
