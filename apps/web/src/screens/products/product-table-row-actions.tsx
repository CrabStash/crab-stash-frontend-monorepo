import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { useRouter } from "next/router";

import { useRemoveProductMutation } from "./use-remove-product-mutation";

import { URLS } from "@app/constants/urls";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Row } from "@crab-stash/ui";
import { Button, Dialog, Dropdown } from "@crab-stash/ui";

export type TableProduct = {
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  categoryId: string;
  id: string;
};

interface ProductTableRowActionsProps {
  row: Row<TableProduct>;
}

function ProductTableRowActions({ row }: ProductTableRowActionsProps) {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const warehouseId = useWarehouseId();
  const product = row.original;
  const router = useRouter();
  const { mutate, isLoading: isRemoving } = useRemoveProductMutation({
    productId: product.id,
    categoryId: product.categoryId,
    onSuccess: () => setIsRemoveModalOpen(false),
  });

  if (!warehouseId) return null;

  return (
    <>
      <Dropdown
        trigger={
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        }
        itemGroups={[
          [
            {
              label: "Edit",
              onClick: () =>
                router.push(URLS.editProduct(warehouseId, product.categoryId, product.id)),
            },
            {
              label: "Remove",
              onClick: () => setIsRemoveModalOpen(true),
            },
          ],
        ]}
      />
      <Dialog
        title={`Remove ${product.name}`}
        description={`Are you sure you want to remove ${product.name} product from this warehouse?`}
        open={isRemoveModalOpen}
        onOpenChange={(open) => setIsRemoveModalOpen(open)}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setIsRemoveModalOpen(false)}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button onClick={() => mutate()} variant="destructive" loading={isRemoving}>
              Remove
            </Button>
          </>
        }
      />
    </>
  );
}

export default ProductTableRowActions;
