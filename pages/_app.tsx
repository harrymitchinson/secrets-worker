import "../styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Footer from "../components/footer";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative bg-gray-900 text-gray-800 dark:text-gray-200 text-md h-screen flex flex-1 flex-col overflow-hidden sm:px-6 lg:px-8">
        <div className="relative sm:flex flex-1 flex-col items-center justify-center">
          <main className="w-full max-w-screen-sm bg-gray-100 dark:bg-gray-800 shadow-md py-8 px-4 sm:p-8">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </div>
    </QueryClientProvider >
  );
}
