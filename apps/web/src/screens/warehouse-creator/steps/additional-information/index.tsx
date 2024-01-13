import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import StepHeader from "../../components/step-header";
import type { WarehouseCreateStepFormId } from "../../types";
import { useCreateWarehouseMutation } from "../../use-create-warehouse-mutation";
import { useBasicInformationStepStore } from "../basic-information/basic-information-step-store";
import { useLogoStepStore } from "../logo/logo-step-store";
import { useAdditionalInformationStepStore } from "./additional-information-step-store";

import { URLS } from "@app/constants/urls";
import { Form, FormField, InputField, SwitchField, useToast } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const additionalInformationSchema = z.object({
  isPhysical: z.boolean().optional(),
  capacity: z.number().int().optional(),
});

export type AdditionalInformationForm = z.infer<typeof additionalInformationSchema>;

const defaultValues: AdditionalInformationForm = {
  isPhysical: undefined,
  capacity: undefined,
};

const additionalInformationFormId: WarehouseCreateStepFormId = "additional-information-form";

interface AdditionalInformationProps {
  redirectToDashboardOnSuccess?: boolean;
}

function AdditionalInformation({
  redirectToDashboardOnSuccess = false,
}: AdditionalInformationProps) {
  const router = useRouter();
  const { additionalInformationStepData: storeAdditionalInformationStepData } =
    useAdditionalInformationStepStore();
  const form = useForm({
    resolver: zodResolver(additionalInformationSchema),
    defaultValues: storeAdditionalInformationStepData ?? defaultValues,
  });
  const isPhysical = form.watch("isPhysical");
  const basicInformationStepData = useBasicInformationStepStore(
    (state) => state.basicInformationStepData,
  );
  const logo = useLogoStepStore((state) => state.logo);
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
        capacity: data.isPhysical ? data.capacity || 0 : -1,
        logo: logo,
      });

      toast({
        title: "Warehouse created",
        description: "Warehouse has been created successfully",
      });

      if (redirectToDashboardOnSuccess) {
        router.push(URLS.dashboard);
      }
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
                value="isPhysical"
                onClick={() => {
                  form.setValue("isPhysical", !field.value);
                }}
                checked={field.value}
              />
            )}
          />
          {isPhysical && (
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
          )}
        </div>
      </form>
    </Form>
  );
}

export default AdditionalInformation;
