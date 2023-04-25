import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlProvider } from "next-intl";
import { useRouter } from "next/router";

import en from "@/../lang/en.json";
import zh from "@/../lang/zh.json";
import ja from "@/../lang/ja.json";

const messages = { en, zh, ja };

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <>
      <ThemeProvider attribute="class">
        <NextIntlProvider locale={locale} messages={messages[locale]}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
