import "../styles.css";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="relative bg-gray-900 text-sm h-screen flex flex-1 flex-col overflow-hidden py-4 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 flex-col items-center justify-center py-12">
          <div className="w-full max-w-xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
