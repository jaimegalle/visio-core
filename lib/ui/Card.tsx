import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["rounded-lg border border-bs-border bg-white shadow-sm", className].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["border-b border-bs-border px-4 py-3", className].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={["p-4", className].join(" ")} {...props}>
        {children}
      </div>
    );
  }
);
CardBody.displayName = "CardBody";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["border-t border-bs-border px-4 py-3", className].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = "CardFooter";

interface CardImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "top" | "bottom";
}

export const CardImg = React.forwardRef<HTMLImageElement, CardImgProps>(
  ({ variant = "top", className = "", ...props }, ref) => {
    const rounded = variant === "top" ? "rounded-t-lg" : "rounded-b-lg";
    return (
      <img
        ref={ref as React.Ref<HTMLImageElement>}
        className={["block w-full", rounded, className].join(" ")}
        {...props}
      />
    );
  }
);
CardImg.displayName = "CardImg";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Tag = "h5", className = "", children, ...props }, ref) => {
    return (
      <Tag ref={ref} className={["font-semibold text-bs-dark", className].join(" ")} {...props}>
        {children}
      </Tag>
    );
  }
);
CardTitle.displayName = "CardTitle";

interface CardTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardText = React.forwardRef<HTMLParagraphElement, CardTextProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <p ref={ref} className={["text-bs-secondary-700 text-sm", className].join(" ")} {...props}>
        {children}
      </p>
    );
  }
);
CardText.displayName = "CardText";

interface CardLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const CardLink = React.forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={["text-bs-primary hover:text-bs-primary-700 hover:underline", className].join(" ")}
        {...props}
      />
    );
  }
);
CardLink.displayName = "CardLink";
