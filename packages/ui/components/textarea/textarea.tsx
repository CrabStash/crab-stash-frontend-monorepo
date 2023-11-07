import * as React from "react";

import { cn } from "../../lib/utils";
import { FormLabel, FormMessage } from "../form";
import { Label } from "../label";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  asField?: boolean;
  label?: string;
  message?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, asField, message, label, ...props }, ref) => {
    return (
      <div className={cn("grid w-full max-w-full items-center gap-1.5", className)}>
        {label && (
          <>
            {asField ? (
              <FormLabel htmlFor={props.id}>{label}</FormLabel>
            ) : (
              <Label htmlFor={props.id} className="text-sm">
                {label}
              </Label>
            )}
          </>
        )}
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {!asField && <p className="text-sm text-muted-foreground">{message}</p>}
        {asField && <FormMessage>{message}</FormMessage>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
