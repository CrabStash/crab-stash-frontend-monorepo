import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { additionalInformationSchema } from "../warehouse-creator/steps/additional-information";
import { basicInformationSchema } from "../warehouse-creator/steps/basic-information";
import WarehouseDelete from "./warehouse-delete";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { useUpdateWarehouseMutation } from "@app/hooks/mutations/use-update-warehouse-mutation";
import useWarehouseInfoQuery from "@app/hooks/queries/use-warehouse-info-query";
import {
  Button,
  Form,
  FormField,
  InputField,
  Separator,
  SwitchField,
  TextareaField,
  useToast,
} from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";

const generalSettingsSchema = basicInformationSchema.merge(additionalInformationSchema);

type GeneralSettingsForm = z.infer<typeof generalSettingsSchema>;

function GeneralSettings() {
  const { query } = useRouter();
  const warehouseId = getWarehouseId(query);
  const { toast } = useToast();

  const { data } = useWarehouseInfoQuery({ id: warehouseId });
  const warehouseInfo = data?.response.data;

  const { mutateAsync } = useUpdateWarehouseMutation({
    id: warehouseId,
  });

  const form = useForm<GeneralSettingsForm>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      name: warehouseInfo?.name,
      capacity: warehouseInfo?.capacity,
      description: warehouseInfo?.desc,
      isPhysical: warehouseInfo?.isPhysical,
    },
  });
  const isPhysical = form.watch("isPhysical");

  const onSubmit = async (formData: GeneralSettingsForm) => {
    if (!data?.response.data) return;

    try {
      await mutateAsync({
        name: formData.name,
        desc: formData.description,
        capacity: formData.isPhysical ? formData.capacity || 0 : -1,
        isPhysical: formData.isPhysical,
        logo: data.response.data.logo,
      });

      toast({
        title: "Success",
        description: "Warehouse information updated successfully.",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while updating warehouse information. Please try again later.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Update your general settings. Set your warehouse name, description, and capacity.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputField label="Name" placeholder="Enter name of your warehouse" {...field} />
            )}
          />
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
                  value={field.value === -1 ? 0 : field.value}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value));
                  }}
                />
              )}
            />
          )}
          <div className="flex flex-col gap-4 w-fit">
            <Button type="submit">Update general settings</Button>
            <WarehouseDelete />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default GeneralSettings;
