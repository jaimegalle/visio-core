import React from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  dark?: boolean;
  responsive?: boolean | "sm" | "md" | "lg" | "xl";
  size?: "sm";
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ striped, hover, bordered, dark, responsive, size, className = "", children, ...props }, ref) => {
    const tableClasses = [
      "w-full text-left text-sm",
      bordered ? "border border-bs-border" : "",
      dark ? "bg-bs-dark text-white" : "",
      striped ? "[&_tbody_tr:nth-child(even)]:bg-bs-secondary-50" : "",
      hover ? "[&_tbody_tr]:hover:bg-bs-secondary-100" : "",
      size === "sm" ? "text-xs" : "",
      className,
    ].join(" ");

    const table = (
      <table ref={ref} className={tableClasses} {...props}>
        {children}
      </table>
    );

    if (responsive) {
      return <div className="overflow-x-auto">{table}</div>;
    }

    return table;
  }
);
Table.displayName = "Table";

interface THeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export const THead = React.forwardRef<HTMLTableSectionElement, THeadProps>(
  ({ className = "", children, ...props }, ref) => (
    <thead ref={ref} className={["border-b border-bs-border", className].join(" ")} {...props}>
      {children}
    </thead>
  )
);
THead.displayName = "THead";

interface TBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export const TBody = React.forwardRef<HTMLTableSectionElement, TBodyProps>(
  ({ className = "", children, ...props }, ref) => (
    <tbody ref={ref} className={className} {...props}>{children}</tbody>
  )
);
TBody.displayName = "TBody";

interface TRProps extends React.HTMLAttributes<HTMLTableRowElement> {
  striped?: boolean;
  hover?: boolean;
  dark?: boolean;
  index?: number;
}
export const TR = React.forwardRef<HTMLTableRowElement, TRProps>(
  ({ className = "", children, ...props }, ref) => (
    <tr ref={ref} className={["border-b border-bs-border last:border-b-0", className].join(" ")} {...props}>
      {children}
    </tr>
  )
);
TR.displayName = "TR";

interface THProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export const TH = React.forwardRef<HTMLTableCellElement, THProps>(
  ({ className = "", children, ...props }, ref) => (
    <th ref={ref} className={["px-4 py-3 font-semibold text-bs-dark", className].join(" ")} {...props}>
      {children}
    </th>
  )
);
TH.displayName = "TH";

interface TDProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export const TD = React.forwardRef<HTMLTableCellElement, TDProps>(
  ({ className = "", children, ...props }, ref) => (
    <td ref={ref} className={["px-4 py-3", className].join(" ")} {...props}>
      {children}
    </td>
  )
);
TD.displayName = "TD";
