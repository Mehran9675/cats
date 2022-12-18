import type { AppProps } from "next/app";
import Layout from "../common/layout";

import "common/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
