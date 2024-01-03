import Link from "next/link";
import { useRouter } from "next/router";

import CategoryDelete from "./components/category-delete";

import PageTitle from "@app/components/page-title";
import { URLS } from "@app/constants/urls";
import useCategoryByIdQuery from "@app/hooks/queries/use-category-by-id-query";
import useFieldByIdQuery from "@app/hooks/queries/use-field-by-id-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { getCategoryId } from "@app/utils/param-ids";
import { Button, Typography } from "@crab-stash/ui";

interface PropertyProps {
  property: string;
}

function Property({ property }: PropertyProps) {
  const { data } = useFieldByIdQuery({ fieldId: property });

  return (
    <div className="w-full py-2 px-4 border-b flex gap-2 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <span>{data?.response.data.formData.title}</span>
      <span className="text-muted-foreground">{data?.response.data.formData.type}</span>
    </div>
  );
}

interface ParentProps {
  parent: string;
}

function Parent({ parent }: ParentProps) {
  const { data } = useCategoryByIdQuery({ categoryId: parent });

  return (
    <div className="w-full py-2 px-4 border-b flex gap-2 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <span>{data?.response.data.formData.title}</span>
      <span className="text-muted-foreground">{data?.response.data.formData.description}</span>
    </div>
  );
}

function Category() {
  const { query } = useRouter();
  const warehouseId = useWarehouseId();
  const categoryId = getCategoryId(query);
  const { data } = useCategoryByIdQuery();

  if (!warehouseId || !categoryId) return null;

  return (
    <div className="space-y-4">
      <PageTitle>{data?.response.data.formData.title} category</PageTitle>
      <Typography as="p">{data?.response.data.formData.description}</Typography>
      {data?.response.data.formData.parents && (
        <div className="flex flex-col space-y-2 w-full">
          <Typography as="h3" className="text-sm font-medium">
            Parent categories (from top to bottom):
          </Typography>
          <div>
            {data?.response.data.formData.parents.map((parent) => (
              <Parent key={parent} parent={parent} />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-2 w-full">
        <Typography as="h3" className="text-sm font-medium">
          Fields:
        </Typography>
        <div>
          {data?.response.data.formData.properties.map((property) => (
            <Property key={property} property={property} />
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <Link href={URLS?.editCategory(warehouseId, categoryId)} passHref>
          <Button asChild>Edit</Button>
        </Link>
        <CategoryDelete />
      </div>
    </div>
  );
}

export default Category;
