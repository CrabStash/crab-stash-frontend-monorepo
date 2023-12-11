import Link from "next/link";
import { useRouter } from "next/router";

import CategoryDelete from "./components/category-delete";

import { URLS } from "@app/constants/urls";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { getCategoryId } from "@app/utils/categoryId";
import { Button } from "@crab-stash/ui";

function Category() {
  const { query } = useRouter();
  const warehouseId = useWarehouseId();
  const categoryId = getCategoryId(query);

  if (!warehouseId || !categoryId) return null;

  return (
    <div>
      <Link href={URLS?.editCategory(warehouseId, categoryId)} passHref>
        <Button asChild>Edit</Button>
      </Link>
      <CategoryDelete />
    </div>
  );
}

export default Category;
