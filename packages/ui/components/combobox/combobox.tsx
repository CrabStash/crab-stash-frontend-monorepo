import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Command } from "../command";
import { Popover } from "../popover";

type ComboboxItem = {
  value: string;
  label: string;
};

export interface ComboboxProps {
  items: ComboboxItem[];
  empty?: React.ReactNode;
  triggerLabel: string;
  placeholder: string;
}

export function Combobox({ items, empty, placeholder, triggerLabel }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? items.find((item) => item.value === value)?.label : triggerLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      }
      content={
        <Command
          placeholder={placeholder}
          empty={empty}
          groups={[
            {
              items: items.map((item) => ({
                value: item.value,
                label: item.label,
                icon: (
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                ),
                onSelect: () => {
                  setValue(value === item.value ? "" : item.value);
                  setOpen(false);
                },
              })),
            },
          ]}
        />
      }
      contentClassName="w-[200px] p-0"
    />
  );
}
