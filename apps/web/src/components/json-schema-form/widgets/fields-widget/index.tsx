import { useEffect, useState } from "react";

import { useWidegetContext } from "../../widgets-context";
import AddFieldDialog from "./add-field-dialog";
import Field from "./field";

import { Button, cn, Label } from "@crab-stash/ui";
import type { WidgetProps } from "@rjsf/utils";

function FieldsWidget(props: WidgetProps) {
  const [isAddFieldDialogOpen, setIsAddFieldDialogOpen] = useState(false);
  const hasFields = props.value?.length > 0 && props.value[0] !== "root";

  const { parentId } = useWidegetContext();

  useEffect(() => {
    if (props.value.length === 0) {
      props.onChange(["root"]);
    }
  }, []);

  return (
    <div className="grid w-full max-w-full items-center gap-1.5">
      <Label>{props.schema.title}</Label>
      <div
        className={cn(
          "flex flex-col gap-1.5 border-2 py-2 px-4 rounded my-4",
          !hasFields && "py-8 px-6",
        )}
      >
        {hasFields ? (
          <>
            {props.value?.map((fieldId: string) => (
              <Field key={fieldId} id={fieldId} />
            ))}
          </>
        ) : (
          <p className="text-base text-gray-500 text-center">
            No fields added to category yet. Click the button below to add a field.
          </p>
        )}
      </div>
      <Button onClick={() => setIsAddFieldDialogOpen(true)} size="sm">
        Add field
      </Button>
      <AddFieldDialog
        isAddFieldDialogOpen={isAddFieldDialogOpen}
        setIsAddFieldDialogOpen={setIsAddFieldDialogOpen}
        parentId={parentId}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default FieldsWidget;
