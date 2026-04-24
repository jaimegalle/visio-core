import React from "react";

type ContainerBreakpoint = "sm" | "md" | "lg" | "xl" | "xxl" | "fluid";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  breakpoint?: ContainerBreakpoint;
}

const containerClasses: Record<ContainerBreakpoint, string> = {
  sm: "mx-auto w-full max-w-screen-sm px-4",
  md: "mx-auto w-full max-w-screen-md px-4",
  lg: "mx-auto w-full max-w-screen-lg px-4",
  xl: "mx-auto w-full max-w-screen-xl px-4",
  xxl: "mx-auto w-full max-w-screen-2xl px-4",
  fluid: "mx-auto w-full px-4",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ breakpoint = "lg", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[containerClasses[breakpoint], className].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";
