import "../styles.css";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main class="relative bg-slate-900 h-screen flex flex-1 flex-col overflow-hidden py-4 px-4 sm:px-6 lg:px-8">
        <div class="relative flex flex-1 flex-col items-center justify-center py-12">
          <h1 class="font-medium leading-tight text-4xl mt-0 mb-4 text-slate-100">
            Secret Worker
          </h1>
          <div class="w-full max-w-md">
            <Component {...pageProps} />
          </div>
        </div>
        {/* <footer class="relative shrink-0">
        <div class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
          <p class="text-center sm:text-left">Don't have an account?</p>
          <a
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
            href="/all-access"
          >
            <span>
              Get access <span aria-hidden="true">→</span>
            </span>
          </a>
        </div>
      </footer> */}
      </main>
    </QueryClientProvider>
  );
}
