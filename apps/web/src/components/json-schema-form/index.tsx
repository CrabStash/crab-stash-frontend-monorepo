import type { ChangeEvent, FocusEvent } from "react";

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
    const { rawErrors, schema, label, uiSchema, onChange, ...selectProps } = props;

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

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
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
      <div className="flex flex-col space-y-3">
        {props.properties.map((element) => (
          <div className="property-wrapper" key={element.name}>
            {element.content}
          </div>
        ))}
      </div>
    </Card>
  );
}

interface JsonSchemaFormProps {
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  onSubmit?: FormProps["onSubmit"];
}

function JsonSchemaForm({ schema, uiSchema, onSubmit }: JsonSchemaFormProps) {
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      templates={{
        ButtonTemplates: {
          SubmitButton,
        },
        BaseInputTemplate,
        FieldTemplate,
        ObjectFieldTemplate,
      }}
      onSubmit={onSubmit}
    />
  );
}

export default JsonSchemaForm;
