import { useForm } from "react-hook-form";

import { useUpdateProfileMutation } from "./use-update-profile-mutation";

import SettingsTab from "@app/components/settings-tab";
import useMeQuery from "@app/hooks/queries/use-me-query";
import { Button, Form, FormField, InputField } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const profileInfoSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
});

type ProfileInfoForm = z.infer<typeof profileInfoSchema>;

function ProfileInfoSettings() {
  const { data } = useMeQuery();
  const me = data?.response.data;
  const form = useForm<ProfileInfoForm>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      email: me?.email || "",
      firstName: me?.firstName || "",
      lastName: me?.lastName || "",
    },
  });
  const { mutate } = useUpdateProfileMutation();

  const handleSubmit = async (formData: ProfileInfoForm) => {
    mutate({
      data: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: "https://google.com",
      },
    });
  };

  return (
    <SettingsTab title="Profile info" description="Update your profile information.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-2xl">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputField label="Email" placeholder="Enter your email" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <InputField label="First name" placeholder="Enter your first name" {...field} />
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <InputField label="Last name" placeholder="Enter your last name" {...field} />
            )}
          />

          <div className="flex flex-col gap-4 w-fit">
            <Button type="submit">Update profile info</Button>
          </div>
        </form>
      </Form>
    </SettingsTab>
  );
}

export default ProfileInfoSettings;
