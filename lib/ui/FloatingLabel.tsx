"use client";

import React, { useState } from "react";

interface FloatingLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingLabel = React.forwardRef<HTMLDivElement, FloatingLabelProps>(
  ({ label, className = "", id, placeholder, ...props }, ref) => {
    const genId = React.useId();
    const inputId = id || genId;
    const [hasValue, setHasValue] = useState(false);

    return (
      <div ref={ref} className={["relative", className].join(" ")}>
        <input
          id={inputId}
          className={[
            "peer block w-full rounded border border-bs-border bg-white px-3 pt-5 pb-1.5 text-sm text-bs-dark placeholder-transparent transition-colors focus:border-bs-primary focus:outline-none focus:ring-2 focus:ring-bs-primary-300",
            hasValue && "border-bs-primary",
          ].join(" ")}
          placeholder={placeholder || label}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            props.onChange?.(e);
          }}
          onFocus={(e) => {
            setHasValue(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            if (!e.target.value) setHasValue(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={[
            "absolute left-3 transition-all peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-bs-primary",
            hasValue ? "top-1.5 text-xs text-bs-primary" : "top-3.5 text-sm text-bs-secondary-500",
          ].join(" ")}
        >
          {label}
        </label>
      </div>
    );
  }
);
FloatingLabel.displayName = "FloatingLabel";
