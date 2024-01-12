import { Info } from "lucide-react";
import type { ChangeEvent, FocusEvent, ReactElement } from "react";

import FieldsWidget from "./widgets/fields-widget";
import ParentsWidget from "./widgets/parents-widget";
import { WidegetContextProvider } from "./widgets-context";

import type { SelectItem } from "@crab-stash/ui";
import { DatePicker, Tooltip } from "@crab-stash/ui";
import { Button, Card, Input, Select } from "@crab-stash/ui";
import { parseAbsoluteToLocal } from "@internationalized/date";
import type { FormProps } from "@rjsf/core";
import Form from "@rjsf/core";
import type {
  BaseInputTemplateProps,
  FieldTemplateProps,
  ObjectFieldTemplateProps,
  RJSFSchema,
  UiSchema,
} from "@rjsf/utils";
import { parseDateString, toDateString } from "@rjsf/utils";
import { getInputProps } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const formatDate = (date?: string, withTime = false) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: withTime ? "short" : undefined,
  }).format(new Date(date));
};

function SubmitButton() {
  return null;
}

interface LabelWithTooltipProps {
  label: string;
  message?: string;
}

const LabelWithTooltip = ({ label, message }: LabelWithTooltipProps) => {
  return (
    <div className="flex items-center gap-1">
      <span>{label}</span>
      {message && (
        <Tooltip content={message}>
          <Info size={16} className="font-primary" />
        </Tooltip>
      )}
    </div>
  );
};

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

  const formReadonly = props.formContext?.readonly ?? false;

  const isDate = schema.format === "date" || schema.format === "date-time";
  const inputProps = { ...rest, ...getInputProps(schema, isDate ? "string" : type, options) };

  return (
    <Input
      id={id}
      label={
        formReadonly ? <LabelWithTooltip label={label} message={props?.schema?.help} /> : label
      }
      value={isDate && formReadonly ? formatDate(value, schema.format === "date-time") : value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly || formReadonly}
      autoFocus={autofocus}
      onChange={onChangeOverride || onTextChange}
      onBlur={onTextBlur}
      onFocus={onTextFocus}
      error={props?.rawErrors?.[0]}
      required={required}
      message={!formReadonly && props?.schema?.help}
      {...inputProps}
    />
  );
}

const getDateValue = (formData: string) => {
  if (formData) {
    const value = parseAbsoluteToLocal(new Date(formData).toISOString());

    return value;
  }

  return null;
};

function FieldTemplate(props: FieldTemplateProps) {
  const { classNames, style, children } = props;
  const readonlyForm = props.formContext?.readonly ?? false;

  if (props.schema.type === "string" && props.schema.format === "date" && !readonlyForm) {
    const { rawErrors, schema, label, onChange } = props;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
      <DatePicker
        onChange={(date) =>
          onChange(toDateString(parseDateString(date.toDate(tz).toISOString(), true)).split("T")[0])
        }
        label={label}
        granularity={"day"}
        value={getDateValue(props.formData)}
        message={schema.help}
        error={rawErrors?.[0]}
      />
    );
  }

  if (props.schema.type === "string" && props.schema.format === "date-time" && !readonlyForm) {
    const { rawErrors, label, schema, onChange } = props;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
      <DatePicker
        onChange={(date) =>
          onChange(toDateString(parseDateString(date.toDate(tz).toISOString(), true)))
        }
        granularity={"minute"}
        value={getDateValue(props.formData)}
        label={label}
        message={schema.help}
        error={rawErrors?.[0]}
      />
    );
  }

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
  const readonly: boolean = props.formContext?.readonly ?? false;
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
        readonly ? null : (
          <Button type="submit" loading={props.uiSchema?.["ui:options"]?.disabled ?? false}>
            Submit
          </Button>
        )
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
  readonly?: boolean;
}

function JsonSchemaForm({
  schema,
  uiSchema,
  onSubmit,
  inModal,
  footer,
  formData,
  readonly = false,
}: JsonSchemaFormProps) {
  return (
    <WidegetContextProvider>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        formData={formData}
        formContext={{
          readonly,
        }}
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
        widgets={{
          parentsWidget: ParentsWidget,
          fieldsWidget: FieldsWidget,
        }}
        onSubmit={onSubmit}
      />
    </WidegetContextProvider>
  );
}

export default JsonSchemaForm;
