import React from "react";

const baseInputClasses =
  "block w-full rounded border border-bs-border bg-white px-3 py-1.5 text-sm text-bs-dark transition-colors placeholder:text-bs-secondary-400 focus:border-bs-primary focus:outline-none focus:ring-2 focus:ring-bs-primary-300 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-65";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isValid, isInvalid, className = "", ...props }, ref) => {
    const validationClass = isValid
      ? "border-bs-success focus:border-bs-success focus:ring-bs-success-300"
      : isInvalid
        ? "border-bs-danger focus:border-bs-danger focus:ring-bs-danger-300"
        : "";

    return (
      <input
        ref={ref}
        className={[baseInputClasses, validationClass, className].join(" ")}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isValid?: boolean;
  isInvalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ isValid, isInvalid, className = "", ...props }, ref) => {
    const validationClass = isValid
      ? "border-bs-success focus:border-bs-success focus:ring-bs-success-300"
      : isInvalid
        ? "border-bs-danger focus:border-bs-danger focus:ring-bs-danger-300"
        : "";

    return (
      <textarea
        ref={ref}
        className={[baseInputClasses, validationClass, className].join(" ")}
        rows={3}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isValid?: boolean;
  isInvalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ isValid, isInvalid, className = "", children, ...props }, ref) => {
    const validationClass = isValid
      ? "border-bs-success focus:border-bs-success focus:ring-bs-success-300"
      : isInvalid
        ? "border-bs-danger focus:border-bs-danger focus:ring-bs-danger-300"
        : "";

    return (
      <select
        ref={ref}
        className={[baseInputClasses, validationClass, className].join(" ")}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={["mb-1 block text-sm font-medium text-bs-dark", className].join(" ")}
        {...props}
      >
        {children}
      </label>
    );
  }
);
FormLabel.displayName = "FormLabel";

interface FormTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const FormText = React.forwardRef<HTMLSpanElement, FormTextProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={["mt-1 block text-xs text-bs-secondary-500", className].join(" ")}
        {...props}
      >
        {children}
      </span>
    );
  }
);
FormText.displayName = "FormText";
