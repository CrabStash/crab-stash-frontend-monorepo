import Link from "next/link";
import { useRouter } from "next/router";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import PageTitle from "@app/components/page-title";
import { URLS } from "@app/constants/urls";
import { Button } from "@crab-stash/ui";

function Fields() {
  const { query } = useRouter();
  const warehouseId = getWarehouseId(query);

  if (!warehouseId) return null;

  return (
    <div className="flex-1">
      <PageTitle
        className="w-full flex items-center justify-between"
        button={
          <Link passHref={true} href={URLS.createField(warehouseId)}>
            <Button asChild className="whitespace-nowrap mt-0">
              Create field
            </Button>
          </Link>
        }
      >
        Fields
      </PageTitle>
    </div>
  );
}

export default Fields;
