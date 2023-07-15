import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "../../lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  pointer?: boolean;
}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, pointer = false, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants(),
        pointer ? "cursor-pointer peer-disabled:cursor-not-allowed" : "",
        className,
      )}
      {...props}
    />
  ),
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
