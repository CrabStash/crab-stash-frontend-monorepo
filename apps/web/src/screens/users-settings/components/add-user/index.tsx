import { useForm } from "react-hook-form";

import { useAddWarehouseUserMutation } from "./use-add-warehouse-user-mutation";

import useWarehouseId from "@app/hooks/use-warehouse-id";
import { Button, Form, FormField, InputField, useToast } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const addUserSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type AddUserForm = z.infer<typeof addUserSchema>;

function AddUser() {
  const warehouseId = useWarehouseId();
  const { mutateAsync } = useAddWarehouseUserMutation();
  const { toast } = useToast();
  const form = useForm<AddUserForm>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (formData: AddUserForm) => {
    if (!warehouseId) return;

    try {
      await mutateAsync({
        warehouseID: warehouseId,
        email: formData.email,
      });
      toast({
        title: "User added",
        description: "User has been added to the warehouse",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User could not be added to the warehouse",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputField
              button={
                <Button type="submit" className="whitespace-nowrap">
                  Add User
                </Button>
              }
              buttonPosition="right"
              label="Email"
              placeholder="Enter your email"
              {...field}
            />
          )}
        />
      </form>
    </Form>
  );
}

export default AddUser;
