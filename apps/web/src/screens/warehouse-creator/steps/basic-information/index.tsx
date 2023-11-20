import { useForm } from "react-hook-form";

import StepHeader from "../../components/step-header";
import type { WarehouseCreateStepFormId } from "../../types";
import { useWarehouseCreatorStore } from "../../warehouse-creator-store";
import { useBasicInformationStepStore } from "./basic-information-step-store";

import { Form, FormField, InputField, TextareaField } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const basicInformationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
});

export type BasicInformationForm = z.infer<typeof basicInformationSchema>;

const basicInformationFormId: WarehouseCreateStepFormId = "basic-information-form";

const defaultValues: BasicInformationForm = {
  name: "",
  description: "",
};

function BasicInformation() {
  const { basicInformationStepData, submitBasicInformationStepData } = useBasicInformationStepStore(
    (state) => state,
  );
  const goToNextStep = useWarehouseCreatorStore((state) => state.goToNextStep);

  const form = useForm<BasicInformationForm>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: basicInformationStepData ?? defaultValues,
  });

  const onSubmit = (data: BasicInformationForm) => {
    submitBasicInformationStepData(data);
    goToNextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id={basicInformationFormId}>
        <StepHeader
          title="Provide basic information about your warehouse"
          description="This information will be used to identify your warehouse. Make sure to provide correct and accurate information."
        />
        <div className="max-w-lg mx-auto space-y-6 mt-4 flex flex-col gap-2 my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputField label="Name" placeholder="Enter name of your warehouse" {...field} />
            )}
          />
          <div className="flex flex-col gap-1">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <TextareaField
                  label="Description"
                  placeholder="Enter description of your warehouse"
                  rows={5}
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default BasicInformation;
