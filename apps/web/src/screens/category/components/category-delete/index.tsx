import { useState } from "react";

import { useRouter } from "next/router";

import { useCategoryDeleteMutation } from "./use-category-delete-mutation";

import useUserRole from "@app/hooks/use-user-role";
import { getCategoryId } from "@app/utils/categoryId";
import { Button, Dialog, useToast } from "@crab-stash/ui";

function CategoryDelete() {
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
  const categoryId = getCategoryId(query);
  const { toast } = useToast();

  const { mutateAsync, isLoading } = useCategoryDeleteMutation({
    categoryId,
  });

  const { isOwner } = useUserRole();

  const handleDelete = async () => {
    try {
      await mutateAsync();

      toast({
        title: "Success",
        description: "Category deleted successfully.",
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
        Delete category
      </Button>
      <Dialog
        title="Delete"
        description="Are you sure you want to delete this category? This action cannot be undone."
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

export default CategoryDelete;
