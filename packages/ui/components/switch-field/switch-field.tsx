import type * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";

import { FormControl, FormItem } from "../form";
import type { SwitchProps } from "../switch";
import { Switch } from "../switch";

const SwitchField = forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  (props, ref) => {
    return (
      <FormItem className="w-full">
        <FormControl>
          <Switch {...props} ref={ref} asField />
        </FormControl>
      </FormItem>
    );
  },
);

export { SwitchField };
