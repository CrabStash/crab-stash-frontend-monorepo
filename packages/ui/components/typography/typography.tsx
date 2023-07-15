import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../lib/utils";

import { cva } from "class-variance-authority";

export type TypographyTag = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "li";
export type TypographyVariant = TypographyTag;

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-2xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      span: "",
      li: "",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export type TypographyProps<Element extends TypographyTag> = {
  as: Element;
  variant?: TypographyVariant;
} & ComponentPropsWithoutRef<Element>;

const Typography = <Element extends TypographyTag = "p">({
  children,
  className,
  as,
  variant,
  ...props
}: TypographyProps<Element>) => {
  const ComponentAs = as || "p";
  const componentVariant = variant || as;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ComponentAs
      className={cn(typographyVariants({ variant: componentVariant, className }))}
      {...(props as Omit<ComponentPropsWithoutRef<"p">, "color">)}
    >
      {children}
    </ComponentAs>
  );
};

export { Typography };
