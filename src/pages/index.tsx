import CourseList from "@/pages/CourseList";
import Header from "@/components/Header";
import Head from "next/head";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";

export default function Home() {
  const t = useTranslations("Head");
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("description")} />
        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <Header />
        <div className="flex justify-center align-center">
          <CourseList />
        </div>
          <Footer />

      </main>
    </>
  );
}

