import "@crab-stash/ui/styles/tailwind.css";

import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import type { AppProps } from "next/app";

import ThemeProvider from "@app/components/theme-provider";
import { Toaster } from "@crab-stash/ui";

function MyApp({ Component, pageProps }: AppProps) {
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
