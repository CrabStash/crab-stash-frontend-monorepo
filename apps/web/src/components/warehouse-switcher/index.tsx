import { CaretSortIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import useWarehousesQuery from "@app/hooks/queries/use-warehouses-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { formatIdToQuery } from "@app/utils/queryIds";
import type { CommandGroupType, CommandItemType } from "@crab-stash/ui";
import { Avatar, Button, Command, Dialog, Input, Label, Popover } from "@crab-stash/ui";

function WarehouseSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showNewWarehouseDialog, setShowNewWarehouseDialog] = useState(false);
  const { data, dataUpdatedAt } = useWarehousesQuery();
  const warehouseId = useWarehouseId();

  const handleWarehouseSelect = (item: CommandItemType) => {
    setSelectedWarehouse(item);
    setOpen(false);

    if (!item.value) return;

    router.push(URLS.warehouseDashboard(formatIdToQuery(item.value)));
  };

  const warehousesAsCommandItems: CommandItemType[] = useMemo(() => {
    if (!data || !data.response.data.list) return [];

    return data.response.data.list.map(({ warehouse }) => ({
      label: warehouse.name,
      value: warehouse.id,
    }));
  }, [data]);

  const groups: CommandGroupType[] = [
    {
      heading: "Warehouses you manage",
      onSelect: handleWarehouseSelect,
      items: warehousesAsCommandItems,
    },
    {
      onSelect: () => {
        router.push(URLS.createWarehouse);
        setOpen(false);
      },
      items: [
        {
          label: "Create a new warehouse",
          icon: <PlusCircledIcon className="mr-2 h-5 w-5" />,
        },
      ],
    },
  ];

  const [selectedWarehouse, setSelectedWarehouse] = useState<CommandItemType | null>(
    warehousesAsCommandItems.find((item) => item.value === warehouseId) ?? null,
  );

  useEffect(() => {
    setSelectedWarehouse(
      warehousesAsCommandItems.find((item) => item.value === warehouseId) ?? null,
    );
  }, [dataUpdatedAt]);

  if (!selectedWarehouse) return null;

  const selectedWarehouseData = data?.response.data.list?.find(
    ({ warehouse }) => warehouse.id === selectedWarehouse.value,
  );

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
            <Avatar
              className="mr-1 h-6 w-6"
              src={selectedWarehouseData?.warehouse.logo}
              fullName={selectedWarehouse.label.split(" ")?.[0]}
            />
            <span className="truncate" title={selectedWarehouse.label}>
              {selectedWarehouse.label}
            </span>
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
      />
    </>
  );
}

export default WarehouseSwitcher;
