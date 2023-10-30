import { forwardRef } from "react";

import { FormControl, FormItem } from "../form";
import type { TextareaProps } from "../textarea";
import { Textarea } from "../textarea";

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <FormItem>
      <FormControl>
        <Textarea {...props} ref={ref} asField />
      </FormControl>
    </FormItem>
  );
});

export { TextareaField };
