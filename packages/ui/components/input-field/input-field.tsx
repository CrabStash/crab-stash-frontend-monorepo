import { forwardRef } from "react";

import { FormControl, FormItem } from "../form";
import type { InputProps } from "../input";
import { Input } from "../input";

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <FormItem>
      <FormControl>
        <Input {...props} ref={ref} asField />
      </FormControl>
    </FormItem>
  );
});

export { InputField };
