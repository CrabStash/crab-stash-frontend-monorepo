import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import useCategoriesQuery from "@app/hooks/queries/use-category-query";
import { Button, cn, Tooltip } from "@crab-stash/ui";
import type { Category } from "types/category";

interface CategoryTreeItemProps extends Category {
  isExpanded: (id: string) => boolean;
  handleExpand: (id: string) => void;
  level: number;
}

function CategoryTreeItem({ id, title, level, isExpanded, handleExpand }: CategoryTreeItemProps) {
  const isCategoryExpanded = isExpanded(id);

  const { data } = useCategoriesQuery({
    parentId: id,
    enabled: isCategoryExpanded,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className={cn("flex items-center px-4 py-2 gap-2 border-b-secondary border-b-2")}>
        <Tooltip
          content={
            <>
              Go to <span className="font-semibold">{title}</span> category and see all the
              information about it.
            </>
          }
        >
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
        </Tooltip>
        <Button
          onClick={() => handleExpand(id)}
          variant="ghost"
          icon={isCategoryExpanded ? ChevronUp : ChevronDown}
          className={cn(
            !isCategoryExpanded && "text-accent-foreground",
            isCategoryExpanded && "text-primary hover:text-primary",
          )}
        />
      </div>
      {isExpanded(id) && (
        <div className={`flex flex-col gap-4 ml-[24px]`}>
          {data?.response.data.list?.map((category) => (
            <CategoryTreeItem
              key={category.id}
              {...category}
              isExpanded={isExpanded}
              handleExpand={handleExpand}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryTree() {
  const { data: rootData } = useCategoriesQuery();
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

  if ((categoriesList?.length || 0) === 0) return null;

  return (
    <div>
      {categoriesList?.map((category) => (
        <CategoryTreeItem
          key={category.id}
          {...category}
          isExpanded={isExpanded}
          handleExpand={handleExpand}
          level={1}
        />
      ))}
    </div>
  );
}

export default CategoryTree;
