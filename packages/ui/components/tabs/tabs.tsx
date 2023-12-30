import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentPropsWithoutRef, ElementRef, ForwardedRef, ReactElement } from "react";
import { forwardRef } from "react";

import { cn } from "../../lib/utils";

const TabsWrapper = TabsPrimitive.Root;

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps {
  readonly?: boolean;
}

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & TabsTriggerProps
>(({ className, disabled, readonly, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    disabled={disabled || readonly}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className,
      readonly && "disabled:opacity-100",
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export interface Tab<TValue extends string> {
  label: string;
  value: TValue;
  content: ReactElement;
  onClick?: (value: TValue) => void;
  disabled?: boolean;
}

export interface TabsProps<TValue extends string>
  extends ComponentPropsWithoutRef<typeof TabsWrapper> {
  tabs: Tab<TValue>[];
  defaultValue?: TValue;
  tabsClassName?: string;
  readonly?: boolean;
}

function TabsInner<TValue extends string>(
  {
    tabs,
    defaultValue,
    readonly,
    tabsClassName,
    ...props
  }: ComponentPropsWithoutRef<typeof TabsWrapper> & TabsProps<TValue>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <TabsWrapper defaultValue={defaultValue} {...props} ref={ref}>
      <TabsList className={tabsClassName}>
        {tabs.map(({ label, value, onClick, disabled }) => (
          <TabsTrigger
            onClick={() => onClick?.(value)}
            value={value}
            key={value}
            readonly={readonly}
            disabled={disabled}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </TabsWrapper>
  );
}

export const Tabs = forwardRef(TabsInner);
