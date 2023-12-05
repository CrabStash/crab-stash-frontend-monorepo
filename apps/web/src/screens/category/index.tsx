import Link from "next/link";
import { useRouter } from "next/router";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { URLS } from "@app/constants/urls";
import { getCategoryId } from "@app/utils/categoryId";
import { Button } from "@crab-stash/ui";

function Category() {
  const { query } = useRouter();
  const warehouseId = getWarehouseId(query);
  const categoryId = getCategoryId(query);

  if (!warehouseId || !categoryId) return null;

  return (
    <Link href={URLS?.editCategory(warehouseId, categoryId)} passHref>
      <Button asChild>Edit</Button>
    </Link>
  );
}

export default Category;
