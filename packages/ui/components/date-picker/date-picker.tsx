import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import type { DateValue } from "react-aria";
import { useButton, useDatePicker, useInteractOutside } from "react-aria";
import type { DatePickerStateOptions } from "react-stately";
import { useDatePickerState } from "react-stately";

import { cn } from "../..";
import { useForwardedRef } from "../../lib/use-forwarded-ref";
import { Button } from "../button";
import { Label } from "../label";
import { Popover } from "../popover";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";

export interface DatePickerProps extends DatePickerStateOptions<DateValue> {
  label?: string;
  message?: string;
  error?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const state = useDatePickerState(props);
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker({ ...props, hideTimeZone: true }, state, ref);
  const { buttonProps } = useButton(_buttonProps, buttonRef);

  useInteractOutside({
    ref: contentRef,
    onInteractOutside: () => {
      setOpen(false);
    },
  });

  return (
    <div className={cn("grid w-full max-w-full items-center gap-1.5")}>
      {props.label && <Label>{props.label}</Label>}
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          groupProps.className,
          "w-fit flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        )}
      >
        <DateField hideTimeZone {...fieldProps} />
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={
            <Button
              {...buttonProps}
              variant="outline"
              className="rounded-l-none"
              disabled={props.isDisabled}
              onClick={() => setOpen(true)}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          }
          content={
            <div {...dialogProps} className="space-y-3">
              <Calendar {...calendarProps} />
              {!!state.hasTime && (
                <TimeField hideTimeZone value={state.timeValue} onChange={state.setTimeValue} />
              )}
            </div>
          }
        />
      </div>
      {props.message && (
        <p
          className={cn(
            "text-sm text-muted-foreground",
            props.error && "text-sm font-medium text-destructive",
          )}
        >
          {props.error || props.message}
        </p>
      )}
    </div>
  );
});

DatePicker.displayName = "DateTimePicker";

export { DatePicker };
