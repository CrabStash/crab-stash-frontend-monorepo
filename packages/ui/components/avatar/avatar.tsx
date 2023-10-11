import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "../../lib/utils";

const AvatarWrapper = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));

AvatarWrapper.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarProps {
  src?: string;
  fullName?: string;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarWrapper>,
  React.ComponentPropsWithoutRef<typeof AvatarWrapper> & AvatarProps
>(({ src, fullName, ...rest }, ref) => {
  const fallback = fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <AvatarWrapper ref={ref} {...rest}>
      <AvatarImage src={src} alt={fullName} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarWrapper>
  );
});

Avatar.displayName = "Avatar";

export { Avatar };
export type { AvatarProps };
