import "@crab-stash/ui/styles/tailwind.css";

import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import ThemeProvider from "@app/components/theme-provider";
import { Toaster, useToast } from "@crab-stash/ui";

function MyApp({ Component, pageProps }: AppProps) {
  const { query, replace } = useRouter();
  const { toast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
  );

  useEffect(() => {
    if (query.permissionDenied === "true") {
      toast({
        title: "Permission denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { permissionDenied, ...queryWithoutPermissionDenied } = query;

      replace(
        {
          query: {
            ...queryWithoutPermissionDenied,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [query.permissionDenied]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <Toaster />
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
