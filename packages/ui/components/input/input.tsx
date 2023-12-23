import * as React from "react";

import { cn } from "../../lib/utils";
import { FormLabel, FormMessage } from "../form";
import { Label } from "../label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  message?: string;
  asField?: boolean;
  button?: React.ReactNode;
  buttonPosition?: "left" | "right";
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      id,
      label,
      button,
      message,
      buttonPosition = "left",
      asField = false,
      error,
      readOnly,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("grid w-full max-w-full items-center gap-1.5", className)}>
        {asField && label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        {!asField && label && <Label htmlFor={id}>{label}</Label>}
        <div className="flex gap-2 items-center w-full">
          {buttonPosition === "left" && button}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
            id={id}
            ref={ref}
            readOnly={readOnly}
            tabIndex={readOnly ? -1 : 0}
            {...props}
          />
          {buttonPosition === "right" && button}
        </div>
        {!asField && (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              error && "text-sm font-medium text-destructive",
            )}
          >
            {error || message}
          </p>
        )}
        {asField && <FormMessage>{message}</FormMessage>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
