import useFieldByIdQuery from "@app/hooks/queries/use-field-by-id-query";
import { Typography } from "@crab-stash/ui";

interface FieldProps {
  id: string;
}

function Field({ id }: FieldProps) {
  const { data } = useFieldByIdQuery({
    fieldId: id,
  });

  if (!data) return null;

  return (
    <Typography as="span" variant="span">
      {data.response.data.formData.title}
    </Typography>
  );
}

export default Field;
