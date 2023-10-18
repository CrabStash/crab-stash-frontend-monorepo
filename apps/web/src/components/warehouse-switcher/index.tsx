import { CaretSortIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import type { CommandGroupType, CommandItemType } from "@crab-stash/ui";
import { Avatar, Button, Command, Dialog, Input, Label, Popover } from "@crab-stash/ui";

function WarehouseSwitcher() {
  const [open, setOpen] = useState(false);
  const [showNewWarehouseDialog, setShowNewWarehouseDialog] = useState(false);

  const handleWarehouseSelect = (item: CommandItemType) => {
    setSelectedWarehouse(item);
    setOpen(false);
  };

  const groups: CommandGroupType[] = [
    {
      heading: "Warehouses you manage",
      onSelect: handleWarehouseSelect,
      items: [
        {
          label: "Officious Corp.",
          value: "personal",
        },
      ],
    },
    {
      heading: "Warehoses you belong to",
      onSelect: handleWarehouseSelect,
      items: [
        {
          label: "Acme Inc.",
          value: "acme-inc",
        },
        {
          label: "Monsters Inc.",
          value: "monsters",
        },
      ],
    },
    {
      onSelect: () => {
        setOpen(false);
        setShowNewWarehouseDialog(true);
      },
      items: [
        {
          label: "Create a new warehouse",
          icon: <PlusCircledIcon className="mr-2 h-5 w-5" />,
        },
      ],
    },
  ];

  const [selectedWarehouse, setSelectedWarehouse] = useState<CommandItemType>(groups[0].items[0]);

  return (
    <>
      <Popover
        trigger={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={"w-[200px] justify-between"}
          >
            <Avatar className="mr-2 h-5 w-5" src={undefined} fullName={selectedWarehouse.label} />
            {selectedWarehouse.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        }
        contentClassName="p-0"
        content={
          <Command groups={groups} placeholder="Search warehouse..." empty="No warehouse found." />
        }
      />
      <Dialog
        title="Create warehouse"
        description="Add a new warehouse to manage products and employees"
        open={showNewWarehouseDialog}
        onOpenChange={(open) => setShowNewWarehouseDialog(open)}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowNewWarehouseDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </>
        }
        content={
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team name</Label>
                <Input id="name" placeholder="Acme Inc." />
              </div>
            </div>
          </div>
        }
      ></Dialog>
    </>
  );
}

export default WarehouseSwitcher;
