import { useForm } from "react-hook-form";

import type { WarehouseCreateStepFormId } from "../types";

import { Form, FormField, InputField, TextareaField } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const basicInformationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
});

type BasicInfromationForm = z.infer<typeof basicInformationSchema>;

const basicInformationFormId: WarehouseCreateStepFormId = "basic-information-form";

function BasicInformation() {
  const form = useForm<BasicInfromationForm>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: BasicInfromationForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id={basicInformationFormId}>
        <div className="w-full max-w-full flex flex-col gap-8 my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputField
                label="Name"
                placeholder="Enter name of your warehouse"
                {...field}
                className="max-w-[384px]"
              />
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
