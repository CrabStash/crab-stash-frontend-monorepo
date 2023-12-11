import { useCreateProductMutation } from "./use-create-product-mutation";

import JsonSchemaForm from "@app/components/json-schema-form";
import useProductSchemaQuery from "@app/hooks/queries/use-entity-schema-query";

function ProductCreator() {
  const { data } = useProductSchemaQuery({
    categoryId: "categories:⟨018c5a60-c37e-7f12-8114-7f8b7731fe56⟩",
  });

  const { mutate, isLoading } = useCreateProductMutation({
    categoryId: "categories:⟨018c5a60-c37e-7f12-8114-7f8b7731fe56⟩",
  });

  if (!data?.response.data) return null;

  return (
    <JsonSchemaForm
      schema={data.response.data.schema}
      uiSchema={{
        "ui:options": {
          disabled: isLoading,
        },
      }}
      onSubmit={(e) => mutate({ formData: e.formData })}
    />
  );
}

export default ProductCreator;
