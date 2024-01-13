import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useUpdateProfileMutation } from "./use-update-profile-mutation";

import SettingsTab from "@app/components/settings-tab";
import useMeQuery from "@app/hooks/queries/use-me-query";
import { Avatar, Button, Form, FormField, InputField } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Base64 } from "types/base64";
import * as z from "zod";

export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

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

export const convertToBase64 = (file: File, onLoad: (base64: Base64) => void) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    onLoad?.(reader.result);
  };
};

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileAsBase64, setFileAsBase64] = useState<string | null>(null);

  const handleSubmit = async (formData: ProfileInfoForm) => {
    mutate({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      avatar: file,
    });
  };

  return (
    <SettingsTab title="Profile info" description="Update your profile information.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-2xl">
          <input
            type="file"
            accept={ALLOWED_FILE_TYPES.join(",")}
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setFile(file);

              convertToBase64(file, (base64) => {
                if (!base64) return;

                setFileAsBase64(base64.toString());
              });
            }}
          />
          <Button
            variant="ghost"
            className="w-24 h-24 rounded-full"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <Avatar
              src={fileAsBase64 ? fileAsBase64.toString() : me?.avatar}
              fullName={`${me?.firstName} ${me?.lastName}`}
              className="w-24 h-24"
            />
          </Button>
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
