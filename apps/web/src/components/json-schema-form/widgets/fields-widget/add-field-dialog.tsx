import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { useRouter } from "next/router";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { fieldsFetcher } from "@app/hooks/queries/use-fields-query";
import { Button, Checkbox, Dialog } from "@crab-stash/ui";

interface AddFieldDialogProps {
  isAddFieldDialogOpen: boolean;
  setIsAddFieldDialogOpen: (open: boolean) => void;
  value?: string[];
  onChange?: (value: string[]) => void;
}

function AddFieldDialog({
  isAddFieldDialogOpen,
  setIsAddFieldDialogOpen,
  value,
  onChange,
}: AddFieldDialogProps) {
  const router = useRouter();
  const warehouseId = getWarehouseId(router.query);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["infinte-fields"],
    queryFn: ({ pageParam = 1 }) => fieldsFetcher(warehouseId, pageParam),
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof fieldsFetcher>>) => {
      if (lastPage?.response.data.pagination.page >= lastPage?.response.data.pagination.total) {
        return undefined;
      }

      return lastPage?.response.data.pagination.page + 1;
    },
  });

  const handleCheckboxChange = (id: string) => {
    if (!value) return;

    if (value.includes(id)) {
      onChange?.(value.filter((v) => v !== id));

      return;
    }

    onChange?.([...value, id]);
  };

  if (!data) return null;

  return (
    <Dialog
      title="Add field"
      description="Add a new field from a list to your form"
      open={isAddFieldDialogOpen}
      onOpenChange={(open) => setIsAddFieldDialogOpen(open)}
      contentClassName="w-[600px] max-w-none"
      content={
        <div className="flex flex-col gap-4">
          <InfiniteScroll
            dataLength={data.pages.reduce((acc, page) => acc + page.response.data.list.length, 0)}
            loader={<h4>Loading...</h4>}
            next={() => fetchNextPage()}
            height={350}
            hasMore={!!hasNextPage}
          >
            {data.pages.map((page) =>
              page.response.data.list.map((field) => (
                <div key={field.id} className="py-2">
                  <Checkbox
                    onCheckedChange={() => handleCheckboxChange(field.id)}
                    checked={value?.includes(field.id)}
                    id={field.id}
                    label={field.title}
                    message={field.type}
                  />
                </div>
              )),
            )}
          </InfiniteScroll>
        </div>
      }
      footer={<Button onClick={() => setIsAddFieldDialogOpen(false)}>Close</Button>}
    />
  );
}

export default AddFieldDialog;
