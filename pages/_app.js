import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { CartProvider } from "../components/cartContext";

export default function MyApp({ pageProps, Component }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
