import { FileImage } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";

import StepHeader from "../../components/step-header";
import type { WarehouseCreateStepFormId } from "../../types";
import { useWarehouseCreatorStore } from "../../warehouse-creator-store";
import { useLogoStepStore } from "./logo-step-store";

import { Button, Form, FormField, InputField } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Base64 } from "types/base64";
import * as z from "zod";

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const logoUploaderSchema = z.object({
  logo: z.string(),
  logoAsBase64: z.string().nonempty({ message: "Logo is required" }),
});

export type LogoUploaderForm = z.infer<typeof logoUploaderSchema>;

const defaultValues: LogoUploaderForm = {
  logo: "",
  logoAsBase64: "",
};

const logoUploaderFormId: WarehouseCreateStepFormId = "logo-form";

function LogoUploader() {
  const {
    logoAsBase64: storeLogoAsBase64,
    logoFileName,
    submitLogoStepData,
  } = useLogoStepStore(({ logoAsBase64, submitLogoStepData, logoFileName }) => ({
    logoAsBase64,
    submitLogoStepData,
    logoFileName,
  }));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<LogoUploaderForm>({
    resolver: zodResolver(logoUploaderSchema),
    defaultValues: storeLogoAsBase64
      ? {
          logo: logoFileName,
          logoAsBase64: storeLogoAsBase64,
        }
      : defaultValues,
  });
  const logoAsBase64 = form.watch("logoAsBase64");

  const convertToBase64 = (file: File, onLoad: (base64: Base64) => void) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      onLoad?.(reader.result);
    };
  };

  const goToNextStep = useWarehouseCreatorStore((state) => state.goToNextStep);

  const onSubmit = (data: LogoUploaderForm) => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) return;

    submitLogoStepData({
      logoAsBase64: data.logoAsBase64,
      logoFileName: data.logo,
      logo: file,
    });
    goToNextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id={logoUploaderFormId}>
        <div className="max-w-lg mx-auto space-y-6">
          <StepHeader
            title="Upload your logo"
            description="Ensure that your logo is clear and high-resolution."
          />
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col items-center gap-2">
              <input
                type="file"
                accept={ALLOWED_FILE_TYPES.join(",")}
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const fileName = file.name;

                  form.setValue("logo", fileName);

                  convertToBase64(file, (asBase64) => {
                    const stringified = asBase64?.toString();

                    if (!stringified) return;

                    form.setValue("logoAsBase64", stringified);
                  });
                }}
              />
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <InputField
                    id="logo-upload"
                    label="Logo Upload"
                    accept={ALLOWED_FILE_TYPES.join(",")}
                    className="w-full"
                    tabIndex={-1}
                    button={
                      <Button
                        className="whitespace-nowrap"
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                      >
                        Choose File
                      </Button>
                    }
                    readOnly
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center p-4 sm:p-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              {logoAsBase64 ? (
                <Image
                  alt="Logo Preview"
                  className="aspect-content overflow-hidden rounded-lg object-contain object-center"
                  height="180"
                  width="180"
                  src={logoAsBase64.toString()}
                />
              ) : (
                <FileImage className="w-[180px] h-[180px] text-zinc-500 dark:text-zinc-400" />
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default LogoUploader;
