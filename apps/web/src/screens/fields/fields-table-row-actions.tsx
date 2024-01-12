import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import FieldCreator from "../field-creator";
import { useRemoveFieldMutation } from "./use-remove-field-mutation";

import useFieldByIdQuery from "@app/hooks/queries/use-field-by-id-query";
import type { Row } from "@crab-stash/ui";
import { Dialog } from "@crab-stash/ui";
import { Button } from "@crab-stash/ui";
import { Dropdown } from "@crab-stash/ui";

export type TableField = {
  id: string;
  title: string;
  type: string;
};

interface FieldsTableRowActionsProps {
  row: Row<TableField>;
}

function FieldsTableRowActions({ row }: FieldsTableRowActionsProps) {
  const field = row.original;
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data, isLoading } = useFieldByIdQuery({
    enabled: isEditModalOpen,
    fieldId: field.id,
  });
  const { mutate, isLoading: isRemoving } = useRemoveFieldMutation({
    fieldId: field.id,
    onSuccess: () => setIsRemoveModalOpen(false),
  });

  return (
    <>
      <Dropdown
        trigger={
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open {field.title} menu</span>
          </Button>
        }
        itemGroups={[
          [
            {
              label: "Edit",
              onClick: () => setIsEditModalOpen(true),
            },
            {
              label: "Remove",
              onClick: () => setIsRemoveModalOpen(true),
            },
          ],
        ]}
      />
      <Dialog
        title={`Remove ${field.title}`}
        description={`Are you sure you want to remove ${field.title} field from this warehouse?`}
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
      <Dialog
        title={`Edit ${field.title}`}
        open={isEditModalOpen}
        onOpenChange={(open) => setIsEditModalOpen(open)}
        contentClassName="w-full max-w-2xl"
        content={
          <>
            {isLoading ? (
              <div className="h-16 flex items-center justify-center">
                <Loader2 className="animate-spin w-16 h-16 text-primary" />
              </div>
            ) : (
              <FieldCreator
                formData={data?.response.data.formData || null}
                fieldId={field.id}
                onSuccess={() => setIsEditModalOpen(false)}
                footer={
                  <div className="w-full flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                }
                inModal
              />
            )}
          </>
        }
      />
    </>
  );
}

export default FieldsTableRowActions;
