import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import SSRProvider from "react-bootstrap/SSRProvider";
import { QueryClientProvider, QueryClient } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <SSRProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </SSRProvider>
      </QueryClientProvider>
    </>
  );
}
