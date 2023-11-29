import type { ChangeEvent, FocusEvent, ReactElement } from "react";

import type { SelectItem } from "@crab-stash/ui";
import { Button, Card, Input, Select } from "@crab-stash/ui";
import type { FormProps } from "@rjsf/core";
import Form from "@rjsf/core";
import type {
  BaseInputTemplateProps,
  FieldTemplateProps,
  ObjectFieldTemplateProps,
  RJSFSchema,
  UiSchema,
} from "@rjsf/utils";
import { getInputProps } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

function SubmitButton() {
  return null;
}

function BaseInputTemplate(props: BaseInputTemplateProps) {
  const {
    schema,
    id,
    options,
    label,
    value,
    type,
    placeholder,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    ...rest
  } = props;

  const onTextChange = ({ target: { value: val } }: ChangeEvent<HTMLInputElement>) => {
    onChange(val === "" ? options.emptyValue || "" : val);
  };
  const onTextBlur = ({ target: { value: val } }: FocusEvent<HTMLInputElement>) => onBlur(id, val);
  const onTextFocus = ({ target: { value: val } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, val);

  const inputProps = { ...rest, ...getInputProps(schema, type, options) };

  return (
    <Input
      id={id}
      label={label}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      onChange={onChangeOverride || onTextChange}
      onBlur={onTextBlur}
      onFocus={onTextFocus}
      error={props?.rawErrors?.[0]}
      required={required}
      {...inputProps}
    />
  );
}

function FieldTemplate(props: FieldTemplateProps) {
  const { classNames, style, children } = props;

  if ((props?.schema?.enum?.length || 0) > 0) {
    const { rawErrors, schema, formData, label, uiSchema, onChange, ...selectProps } = props;

    const enumNames = schema.enumNames as string[];
    const enumValues = schema.enum as string[];

    const selectItems: SelectItem[] = enumValues.map((value, index) => ({
      value: value,
      label: enumNames[index],
    }));

    return (
      <Select
        error={rawErrors?.[0]}
        items={selectItems}
        onValueChange={onChange}
        label={label}
        placeholder={uiSchema?.["ui:placeholder"] as string}
        defaultValue={formData}
        {...selectProps}
      />
    );
  }

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}

function ObjectFieldTemplate(
  props: ObjectFieldTemplateProps & { inModal?: boolean; footer?: ReactElement },
) {
  const fields = (
    <div className="flex flex-col space-y-3">
      {props.properties.map((element) => (
        <div className="property-wrapper" key={element.name}>
          {element.content}
        </div>
      ))}
    </div>
  );

  if (props.inModal) {
    return (
      <div className="space-y-6">
        {fields}
        {props.footer}
      </div>
    );
  }

  return (
    <Card
      title={props.title}
      description={props.description}
      footerContent={
        <Button type="submit" loading={props.uiSchema?.["ui:options"]?.disabled ?? false}>
          Submit
        </Button>
      }
    >
      {fields}
    </Card>
  );
}

interface JsonSchemaFormProps {
  schema: RJSFSchema;
  formData?: Record<string, unknown> | null;
  uiSchema?: UiSchema;
  onSubmit?: FormProps["onSubmit"];
  inModal?: boolean;
  footer?: ReactElement;
}

function JsonSchemaForm({
  schema,
  uiSchema,
  onSubmit,
  inModal,
  footer,
  formData,
}: JsonSchemaFormProps) {
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      formData={formData}
      templates={{
        ButtonTemplates: {
          SubmitButton,
        },
        BaseInputTemplate,
        FieldTemplate,
        ObjectFieldTemplate: (props) => (
          <ObjectFieldTemplate {...props} inModal={inModal} footer={footer} />
        ),
      }}
      onSubmit={onSubmit}
    />
  );
}

export default JsonSchemaForm;