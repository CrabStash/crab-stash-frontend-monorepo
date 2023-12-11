import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import useCategoryByIdQuery from "@app/hooks/queries/use-category-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { getCategoryId } from "@app/utils/categoryId";
import { Button, cn, Tooltip } from "@crab-stash/ui";
import type { Category } from "types/category";

export const ROOT_CATEGORY_ID = "root";

interface SharedProps {
  selectedPath?: string[];
  highlightOnlyPath?: boolean;
  asButton?: boolean;
  onClick?: (path: string[]) => void;
}

interface CategoryTreeButtonProps extends SharedProps {
  warehouseId: string;
  id: string;
  title: string;
  isCategoryExpanded: boolean;
  path: string[];
}

function CategoryTreeButton({
  asButton = false,
  onClick,
  warehouseId,
  id,
  isCategoryExpanded,
  title,
  path,
  selectedPath,
  highlightOnlyPath = false,
}: CategoryTreeButtonProps) {
  const { query } = useRouter();
  const categoryId = getCategoryId(query);

  if (asButton) {
    const isInSelectedPath = selectedPath?.includes(id);

    const disabled = categoryId === id;

    return (
      <Button
        variant="link"
        className={cn(
          "text-base p-0",
          !highlightOnlyPath && isCategoryExpanded && "text-primary",
          !highlightOnlyPath && !isCategoryExpanded && "text-accent-foreground",
          highlightOnlyPath && !isInSelectedPath && "text-accent-foreground",
          highlightOnlyPath && isInSelectedPath && "text-primary",
          id === ROOT_CATEGORY_ID && selectedPath?.length === 0 && "text-primary",
        )}
        onClick={() => onClick?.(id === ROOT_CATEGORY_ID ? [] : path)}
        disabled={disabled}
      >
        {title}
      </Button>
    );
  }

  return (
    <Link href={URLS.categoryById(warehouseId, id)} passHref>
      <Button
        variant="link"
        className={cn(
          "text-base p-0",
          isCategoryExpanded && "text-primary",
          !isCategoryExpanded && "text-accent-foreground",
        )}
      >
        {title}
      </Button>
    </Link>
  );
}

interface CategoryTreeItemProps extends Category, SharedProps {
  isExpanded: (id: string) => boolean;
  handleExpand: (id: string) => void;
  level: number;
  path: string[];
  hasChildren?: boolean;
}

function CategoryTreeItem({
  id,
  title,
  level,
  isExpanded,
  handleExpand,
  asButton,
  onClick,
  path,
  selectedPath,
  highlightOnlyPath = false,
  hasChildren = true,
}: CategoryTreeItemProps) {
  const isCategoryExpanded = isExpanded(id);
  const warehouseId = useWarehouseId();

  const { data } = useCategoryByIdQuery({
    parentId: id,
    enabled: isCategoryExpanded,
  });

  if (!warehouseId) return null;

  return (
    <div className="flex flex-col">
      <div className={cn("flex items-center px-4 py-3 gap-2 border-b-secondary border-b-2")}>
        <Tooltip
          content={
            <>
              Go to <span className="font-semibold">{title}</span> category and see all the
              information about it.
            </>
          }
        >
          <CategoryTreeButton
            asButton={asButton}
            onClick={onClick}
            warehouseId={warehouseId}
            id={id}
            isCategoryExpanded={isCategoryExpanded}
            title={title}
            path={[...path, id]}
            selectedPath={selectedPath}
            highlightOnlyPath={highlightOnlyPath}
          />
        </Tooltip>
        {hasChildren && (
          <Button
            onClick={() => handleExpand(id)}
            variant="ghost"
            icon={isCategoryExpanded ? ChevronUp : ChevronDown}
            className={cn(
              !isCategoryExpanded && "text-accent-foreground",
              isCategoryExpanded && "text-primary hover:text-primary",
            )}
          />
        )}
      </div>
      {isExpanded(id) && (
        <div className={`flex flex-col ml-[24px]`}>
          {data?.response.data.list?.map((category) => (
            <CategoryTreeItem
              key={category.id}
              {...category}
              isExpanded={isExpanded}
              handleExpand={handleExpand}
              level={level + 1}
              asButton={asButton}
              onClick={onClick}
              path={[...path, id]}
              selectedPath={selectedPath}
              highlightOnlyPath={highlightOnlyPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CategoryTreeProps extends SharedProps {
  withRootCategory?: boolean;
}

function CategoryTree({
  asButton = false,
  onClick,
  selectedPath,
  highlightOnlyPath = false,
  withRootCategory = false,
}: CategoryTreeProps) {
  const { data: rootData } = useCategoryByIdQuery();
  const [expanded, setExpanded] = useState<string[]>([]);

  const categoriesList = rootData?.response.data.list;

  const isExpanded = (id: string) => expanded.includes(id);

  const handleExpand = (id: string) => {
    if (isExpanded(id)) {
      setExpanded((prev) => prev.filter((item) => item !== id));

      return;
    }

    setExpanded((prev) => [...prev, id]);
  };

  if (!categoriesList || categoriesList.length === 0) return null;

  return (
    <div>
      {[
        ...(withRootCategory
          ? [
              {
                id: ROOT_CATEGORY_ID,
                title: "ROOT",
                description: "",
              },
            ]
          : []),
        ...categoriesList,
      ].map((category) => (
        <CategoryTreeItem
          key={category.id}
          {...category}
          isExpanded={isExpanded}
          handleExpand={handleExpand}
          level={1}
          asButton={asButton}
          onClick={onClick}
          path={[]}
          selectedPath={selectedPath}
          highlightOnlyPath={highlightOnlyPath}
          hasChildren={category.id !== "ROOT"}
        />
      ))}
    </div>
  );
}

export default CategoryTree;
