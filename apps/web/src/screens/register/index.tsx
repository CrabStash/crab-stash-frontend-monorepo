import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/router";

import { loginSchema } from "../login";
import { useRegisterMutation } from "./useRegisterMutation";

import { URLS } from "@app/constants/urls";
import { Button, Card, Form, FormField, InputField, useToast } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not the same.",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
  const { push } = useRouter();
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });
  const { mutateAsync: register, isLoading } = useRegisterMutation();
  const { toast } = useToast();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register({
        email: data.email,
        passwd: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      toast({
        title: "Register successful",
        description: "You have been registered successfully.",
      });

      push(URLS.dashboard);
    } catch (error) {
      toast({
        title: "Register failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
        <Card
          title="Register"
          description="Create an account to start managing your shop's stash."
          footerContent={
            <div className="flex justify-between w-full">
              <Button variant="secondary" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="outline" loading={isLoading}>
                Reigster
              </Button>
            </div>
          }
          onSubmit={form.handleSubmit(onSubmit)}
          asForm
        >
          <div className="w-96 max-w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <InputField label="Email" placeholder="Enter your email" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputField
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
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
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  {...field}
                />
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
            <Button variant="ghost">
              <Link href={URLS.login}>Already have an account? Login</Link>
            </Button>
          </div>
        </Card>
      </Form>
    </div>
  );
}

export default Register;
