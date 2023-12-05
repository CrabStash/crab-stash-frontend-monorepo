import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md text-xs",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const loaderVariants = cva("animate-spin mr-2", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-4 w-4",
      lg: "h-5 w-5",
    },
  },
});

const iconVariants = cva("", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-4 w-4",
      lg: "h-5 w-5",
    },
    position: {
      left: "mr-2",
      right: "ml-2",
    },
    withoutChildren: {
      true: "mr-0 ml-0",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      loading = false,
      iconPosition = "left",
      children,
      icon,
      ...props
    },
    ref,
  ) => {
    const Icon = icon;
    const Comp = (asChild ? "div" : "button") as "button";
    const iconComponent = Icon && (
      <Icon
        className={cn(iconVariants({ size, position: iconPosition, withoutChildren: !children }))}
      />
    );

    return (
      <Comp
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!loading && iconPosition === "left" && iconComponent}
        {loading && <Loader2 className={cn(loaderVariants({ size }))} />}
        {children}
        {!loading && iconPosition === "right" && iconComponent}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
