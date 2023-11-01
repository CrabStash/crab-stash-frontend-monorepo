import type * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";

import { FormControl, FormItem } from "../form";
import type { SwitchProps } from "../switch";
import { Switch } from "../switch";

const SwitchField = forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ value, ...props }, ref) => {
    return (
      <FormItem className="w-full">
        <FormControl>
          <Switch value={value as unknown as boolean} {...props} ref={ref} asField />
        </FormControl>
      </FormItem>
    );
  },
);

export { SwitchField };
