import * as React from "react";

import { cn } from "../../lib/utils";
import { FormLabel, FormMessage } from "../form";
import { Label } from "../label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  asField?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, message, asField = false, ...props }, ref) => {
    return (
      <div className={cn("grid w-full max-w-full items-center gap-1.5", className)}>
        {asField && label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        {!asField && label && <Label htmlFor={id}>{label}</Label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          id={id}
          ref={ref}
          {...props}
        />{" "}
        {!asField && <p className="text-sm text-muted-foreground">{message}</p>}
        {asField && <FormMessage>{message}</FormMessage>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
