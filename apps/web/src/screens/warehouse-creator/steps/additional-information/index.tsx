import { useForm } from "react-hook-form";

import StepHeader from "../../components/step-header";
import type { WarehouseCreateStepFormId } from "../../types";
import { useCreateWarehouseMutation } from "../../use-create-warehouse-mutation";
import { useBasicInformationStepStore } from "../basic-information/basic-information-step-store";
import { useAdditionalInformationStepStore } from "./additional-information-step-store";

import { Form, FormField, InputField, SwitchField, useToast } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const additionalInformationSchema = z.object({
  isPhysical: z.boolean().optional(),
  capacity: z.number().int().positive().optional(),
});

export type AdditionalInformationForm = z.infer<typeof additionalInformationSchema>;

const defaultValues: AdditionalInformationForm = {
  isPhysical: undefined,
  capacity: undefined,
};

const additionalInformationFormId: WarehouseCreateStepFormId = "additional-information-form";

function AdditionalInformation() {
  const { additionalInformationStepData: storeAdditionalInformationStepData } =
    useAdditionalInformationStepStore();
  const form = useForm({
    resolver: zodResolver(additionalInformationSchema),
    defaultValues: storeAdditionalInformationStepData ?? defaultValues,
  });
  const basicInformationStepData = useBasicInformationStepStore(
    (state) => state.basicInformationStepData,
  );
  const { mutateAsync } = useCreateWarehouseMutation();
  const { toast } = useToast();

  const onSubmit = async (data: AdditionalInformationForm) => {
    if (!basicInformationStepData) {
      return;
    }

    try {
      await mutateAsync({
        name: basicInformationStepData.name,
        desc: basicInformationStepData.description,
        isPhysical: data.isPhysical,
        capacity: data.capacity || 0,
        logo: "https://google.com",
      });

      toast({
        title: "Warehouse created",
        description: "Warehouse has been created successfully",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Warehouse creation failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id={additionalInformationFormId}>
        <StepHeader
          title="Provide additional information about your warehouse"
          description="This information will be used to identify your warehouse. Make sure to provide correct and accurate information."
        />
        <div className="max-w-lg mx-auto space-y-6 mt-4 flex flex-col gap-2 my-8">
          <FormField
            control={form.control}
            name="isPhysical"
            render={({ field }) => (
              <SwitchField
                label="Determine if your warehouse has a physical location"
                {...field}
                value="true"
                checked={field.value}
              />
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <InputField
                type="number"
                label="Capacity"
                placeholder="Enter capacity of your warehouse"
                {...field}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value));
                }}
              />
            )}
          />
        </div>
      </form>
    </Form>
  );
}

export default AdditionalInformation;
