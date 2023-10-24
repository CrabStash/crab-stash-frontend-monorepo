import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "../../lib/utils";

const wrapperClasses = "rounded-lg border bg-card text-card-foreground shadow-md max-w-full";

const CardWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(wrapperClasses, className)} {...props} />
  ),
);

const CardFormWrapper = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn(wrapperClasses, className)} {...props} />
  ),
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight flex justify-between gap-1",
        className,
      )}
      {...props}
    />
  ),
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);

CardFooter.displayName = "CardFooter";

export interface CardProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  titleClassName?: string;
  description?: string;
  footerContent?: ReactNode;
  asForm?: boolean;
}

export function Card({
  children,
  title,
  titleClassName,
  description,
  footerContent,
  icon,
  asForm,
  ...rest
}: CardProps) {
  const content = (
    <>
      <CardHeader>
        <CardTitle className={titleClassName}>
          {title}
          {icon}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </>
  );

  if (asForm) {
    return <CardFormWrapper {...rest}>{content}</CardFormWrapper>;
  }

  return <CardWrapper {...rest}>{content}</CardWrapper>;
}
