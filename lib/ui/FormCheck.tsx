"use client";

import React from "react";

interface FormCheckProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "checkbox" | "radio" | "switch";
  label?: React.ReactNode;
  inline?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const FormCheck = React.forwardRef<HTMLDivElement, FormCheckProps>(
  ({ type = "checkbox", label, inline, isValid, isInvalid, className = "", inputRef, id, ...props }, ref) => {
    const isSwitch = type === "switch";
    const inputType = isSwitch ? "checkbox" : type;

    const genId = React.useId();
    const checkId = id || genId;

    return (
      <div
        ref={ref}
        className={[
          "flex items-start gap-2",
          inline && "inline-flex mr-4",
          className,
        ].join(" ")}
      >
        {isSwitch ? (
          <label htmlFor={checkId} className="relative inline-flex cursor-pointer items-center">
            <input
              ref={inputRef}
              id={checkId}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            <div className="h-5 w-9 rounded-full bg-bs-secondary-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-bs-primary peer-checked:after:translate-x-4 peer-focus:ring-2 peer-focus:ring-bs-primary-300 peer-disabled:opacity-65" />
          </label>
        ) : (
          <input
            ref={inputRef}
            id={checkId}
            type={inputType}
            className={[
              "mt-0.5 h-4 w-4 rounded border-bs-border text-bs-primary focus:ring-2 focus:ring-bs-primary-300",
              isValid && "border-bs-success text-bs-success",
              isInvalid && "border-bs-danger text-bs-danger",
            ].join(" ")}
            {...props}
          />
        )}
        {label && (
          <label htmlFor={checkId} className="text-sm text-bs-dark cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
    );
  }
);
FormCheck.displayName = "FormCheck";
