import { useForm } from "react-hook-form";

import Link from "next/link";

import { useLoginMutation } from "./useLoginMutation";

import { URLS } from "@app/constants/urls";
import { Button, Card, Form, FormField, InputField } from "@crab-stash/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginScreen() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: login } = useLoginMutation();

  const onSubmit = (data: LoginForm) => {
    login({
      email: data.email,
      passwd: data.password,
    });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
        <Card
          title="Login"
          description="Enter your credentials to login"
          footerContent={
            <div className="flex justify-between w-full">
              <Button variant="secondary">Cancel</Button>
              <Button type="submit" variant="outline">
                Login
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
            <div className="flex flex-col gap-1">
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
              <Button variant="link" size="sm" className="w-min whitespace-nowrap p-0">
                Forgot Password?
              </Button>
            </div>
            <Button variant="ghost">
              <Link href={URLS.register}>Don't have an account? Sign up</Link>
            </Button>
          </div>
        </Card>
      </Form>
    </div>
  );
}

export default LoginScreen;
