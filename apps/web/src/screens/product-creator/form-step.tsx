import { useCreateProductMutation } from "./use-create-product-mutation";
import { useEditProductMutation } from "./use-edit-product-mutation";

import JsonSchemaForm from "@app/components/json-schema-form";
import useProductSchemaQuery from "@app/hooks/queries/use-entity-schema-query";
import type { ProductFormData } from "@app/hooks/queries/use-product-by-id-query";

interface FormStepProps {
  categoryId: string;
  formData?: ProductFormData;
}

function FormStep({ categoryId, formData }: FormStepProps) {
  const { data } = useProductSchemaQuery({
    categoryId,
  });
  const { mutate, isLoading } = useCreateProductMutation({
    categoryId,
  });

  const { mutate: mutateEdit, isLoading: isEditing } = useEditProductMutation({
    categoryId,
  });

  if (!data?.response.data) return null;

  return (
    <JsonSchemaForm
      schema={data.response.data.schema}
      formData={formData}
      uiSchema={{
        "ui:options": {
          disabled: isLoading || isEditing,
        },
      }}
      onSubmit={(e) =>
        formData ? mutateEdit({ formData: e.formData }) : mutate({ formData: e.formData })
      }
    />
  );
}

export default FormStep;
