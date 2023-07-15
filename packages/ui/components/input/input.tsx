import * as React from "react";

import { cn } from "../../lib/utils";
import { Label } from "../label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, message, ...props }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          id={id}
          ref={ref}
          {...props}
        />{" "}
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
