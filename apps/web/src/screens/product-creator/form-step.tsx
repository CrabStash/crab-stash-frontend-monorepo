import { useCreateProductMutation } from "./use-create-product-mutation";

import JsonSchemaForm from "@app/components/json-schema-form";
import useProductSchemaQuery from "@app/hooks/queries/use-entity-schema-query";

interface FormStepProps {
  categoryId: string;
}

function FormStep({ categoryId }: FormStepProps) {
  const { data } = useProductSchemaQuery({
    categoryId,
  });
  const { mutate, isLoading } = useCreateProductMutation({
    categoryId,
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

export default FormStep;
