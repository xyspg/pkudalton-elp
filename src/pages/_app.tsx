import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlProvider } from "next-intl";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <NextIntlProvider messages={pageProps.messages}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
