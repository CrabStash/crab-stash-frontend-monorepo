import { useCreateFieldMutation } from "./use-create-field-mutation";

import JsonSchemaForm from "@app/components/json-schema-form";
import useFieldSchemaQuery from "@app/hooks/queries/use-field-schema-query";

function FieldCreator() {
  const { data } = useFieldSchemaQuery();
  const { mutate, isLoading } = useCreateFieldMutation();

  if (!data?.response.data) return null;

  return (
    <JsonSchemaForm
      schema={data.response.data.schema}
      uiSchema={{
        ...data.response.data.uiSchema,
        "ui:options": {
          ...data.response.data.uiSchema["ui:options"],
          disabled: isLoading,
        },
      }}
      onSubmit={(e) => {
        mutate({ formData: e.formData });
      }}
    />
  );
}

export default FieldCreator;
