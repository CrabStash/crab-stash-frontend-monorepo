import { useState } from "react";

import { useWarehouseDeleteMutation } from "./use-warehouse-delete-mutation";

import useUserRole from "@app/hooks/use-user-role";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { Button, Dialog, useToast } from "@crab-stash/ui";

function WarehouseDelete() {
  const [open, setOpen] = useState(false);
  const warehouseId = useWarehouseId();
  const { toast } = useToast();

  const { mutateAsync, isLoading } = useWarehouseDeleteMutation({
    id: warehouseId,
  });

  const { isOwner } = useUserRole();

  const handleDelete = async () => {
    try {
      await mutateAsync();

      toast({
        title: "Success",
        description: "Warehouse deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  if (!isOwner) return null;

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="destructive">
        Delete warehouse
      </Button>
      <Dialog
        title="Delete"
        description="Are you sure you want to delete this warehouse? This action cannot be undone."
        open={open}
        onOpenChange={(open) => setOpen(open)}
        footer={
          <>
            <Button disabled={isLoading} variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button loading={isLoading} onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </>
        }
      />
    </>
  );
}

export default WarehouseDelete;
