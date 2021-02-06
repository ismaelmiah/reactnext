import React, { useEffect } from "react";
import { CartProvider } from "./context/cartContext";

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
        <Component {...pageProps} />
    </CartProvider>
  );
}
