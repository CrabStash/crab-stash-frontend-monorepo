import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/router";

import { useLoginMutation } from "./use-login-mutation";

import { URLS } from "@app/constants/urls";
import { storeAuthTokens } from "@app/utils/tokens";
import { Button, Card, Form, FormField, InputField, useToast } from "@crab-stash/ui";
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
  const { push } = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync: login, isLoading } = useLoginMutation();
  const { toast } = useToast();

  const onSubmit = async (data: LoginForm) => {
    try {
      const { response } = await login({
        email: data.email,
        passwd: data.password,
      });

      storeAuthTokens(null, { token: response.data.token });

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      push(URLS.dashboard);
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
        <Card
          title="Login"
          description="Enter your credentials to login"
          footerContent={
            <div className="flex justify-between w-full">
              <Button variant="secondary" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="outline" loading={isLoading}>
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
