import { FormControl, FormItem } from "../form";
import type { InputProps } from "../input";
import { Input } from "../input";

function InputField(props: InputProps) {
  return (
    <FormItem>
      <FormControl>
        <Input {...props} asField />
      </FormControl>
    </FormItem>
  );
}

export { InputField };
