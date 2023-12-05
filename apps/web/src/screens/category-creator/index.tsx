import { useCreateCategoryMutation } from "./use-create-category-mutation";

import JsonSchemaForm from "@app/components/json-schema-form";
import type { CategoryFormData } from "@app/hooks/queries/use-category-by-id-query";
import useCategorySchemaQuery from "@app/hooks/queries/use-category-schema-query";

interface CategoryCreatorProps {
  formData?: CategoryFormData;
}

function CategoryCreator({ formData }: CategoryCreatorProps) {
  const { data } = useCategorySchemaQuery();
  const { mutate } = useCreateCategoryMutation();

  if (!data?.response.data) return null;

  return (
    <div className="flex-1">
      <JsonSchemaForm
        schema={data.response.data.schema}
        uiSchema={data.response.data.uiSchema}
        formData={formData}
        onSubmit={(data) =>
          mutate({
            formData: data.formData,
          })
        }
      />
    </div>
  );
}

export default CategoryCreator;
