import { useForm } from "react-hook-form";

import SettingsTab from "@app/components/settings-tab";
import { useChangePasswordMutation } from "@app/hooks/mutations/use-change-password-mutation";
import { Button, Form, FormField, InputField, Typography } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords are not the same.",
    path: ["confirmPassword"],
  });

type PasswordChangeForm = z.infer<typeof passwordChangeSchema>;

function ProfileSecuritySettings() {
  const form = useForm<PasswordChangeForm>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync } = useChangePasswordMutation();

  const handleSubmit = async (formData: PasswordChangeForm) => {
    await mutateAsync({
      newPassword: formData.newPassword,
      oldPassword: formData.oldPassword,
    });
    form.reset();
  };

  return (
    <SettingsTab title="Profile security" description="Update your profile security settings.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-2xl">
          <Typography as="h2" variant="h4">
            Change password
          </Typography>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <InputField
                type="password"
                label="Old password"
                placeholder="Enter your old password"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <InputField
                type="password"
                label="Password"
                placeholder="Enter your new password"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <InputField
                type="password"
                label="Confirm password"
                placeholder="Confirm your new password"
                {...field}
              />
            )}
          />
          <Button type="submit">Update security settings</Button>
        </form>
      </Form>
    </SettingsTab>
  );
}

export default ProfileSecuritySettings;
