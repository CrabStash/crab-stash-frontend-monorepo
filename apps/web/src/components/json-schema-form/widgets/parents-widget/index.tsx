import CategoryTree, { ROOT_CATEGORY_ID } from "@app/components/category-tree";
import useCategoryByIdInheritanceQuery from "@app/hooks/queries/use-category-inheritance-by-id-query";
import { Label, Separator, Typography } from "@crab-stash/ui";
import type { WidgetProps } from "@rjsf/utils";

function ParentsWidget(props: WidgetProps) {
  const { data } = useCategoryByIdInheritanceQuery({
    categoryId: props.value.length > 0 ? props.value[props.value.length - 1] : ROOT_CATEGORY_ID,
  });

  const parents = data?.response.data.parents;

  return (
    <div className="grid w-full max-w-full items-center gap-1">
      <Label>{props.schema.title}</Label>
      <p className="text-sm text-gray-500">{props.schema.description}</p>
      <CategoryTree
        selectedPath={props.value}
        onClick={(path) => props.onChange(path)}
        asButton
        highlightOnlyPath
        withRootCategory
      />
      {props.rawErrors?.[0] && (
        <p className="text-sm font-medium text-destructive">{props.rawErrors?.[0]}</p>
      )}
      {parents && (
        <>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            <Typography as="h3" variant="span">
              Inherited fields from parent categories:
            </Typography>
            {parents.map((parent) => (
              <div className="flex flex-col gap-3" key={parent.id}>
                <Typography
                  as="li"
                  variant="span"
                  key={parent.id}
                  className="text-sm text-gray-500"
                >
                  From {parent.title.toLowerCase()}
                </Typography>
                <div className="flex flex-col gap-1.5 border-2 py-2 px-4 rounded">
                  {parent.fieldNames.map((field, index) => (
                    <Typography as="span" variant="span" key={index}>
                      {field}
                    </Typography>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ParentsWidget;
