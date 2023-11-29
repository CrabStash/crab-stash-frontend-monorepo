import type { ReactElement } from "react";

import { useCreateFieldMutation } from "./use-create-field-mutation";
import { useEditFieldMutation } from "./use-edit-field-mutation";

import JsonSchemaForm from "@app/components/json-schema-form";
import useFieldSchemaQuery from "@app/hooks/queries/use-field-schema-query";

interface FieldCreatorProps {
  formData?: Record<string, unknown> | null;
  inModal?: boolean;
  footer?: ReactElement;
  fieldId?: string;
  onSuccess?: () => void;
}

function FieldCreator({
  inModal = false,
  footer,
  formData,
  fieldId,
  onSuccess,
}: FieldCreatorProps) {
  const { data } = useFieldSchemaQuery();
  const { mutate, isLoading } = useCreateFieldMutation();
  const { mutate: editMutate, isLoading: editIsLoading } = useEditFieldMutation({
    fieldId,
    onSuccess,
  });

  if (!data?.response.data) return null;

  return (
    <JsonSchemaForm
      schema={data.response.data.schema}
      uiSchema={{
        ...data.response.data.uiSchema,
        "ui:options": {
          ...data.response.data.uiSchema["ui:options"],
          disabled: isLoading || editIsLoading,
        },
      }}
      formData={formData}
      onSubmit={(e) => {
        if (fieldId) {
          editMutate({ formData: e.formData });

          return;
        }

        mutate({ formData: e.formData });
      }}
      inModal={inModal}
      footer={footer}
    />
  );
}

export default FieldCreator;
