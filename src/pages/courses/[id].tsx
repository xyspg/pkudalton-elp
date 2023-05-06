'use client';
import { useRouter } from "next/router";
import { list as enList } from "@/data/en/list";
import { list as zhList } from "@/data/zh/list";
import { list as jaList } from "@/data/ja/list";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import PDF from "@/components/PDF";
import ProgramDetailCard from "@/components/ProgramDetailCard";
import {useEffect, useState} from "react";

function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { locale } = router;
  const list = locale === "zh" ? zhList : locale === "ja" ? jaList : enList;
  const course = list.find(
    (c) => c.id === parseInt(typeof id === "string" ? id : "")
  );
  const t = useTranslations("CourseDetails");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const [pageWidth, setPageWidth] = useState(null);
    useEffect(() => {
        const getPageWidth = () => {
            const breakpoint = 768;

            if (window.innerWidth < breakpoint) {
                return window.innerWidth * 0.9;
            } else {
                return window.innerWidth / 2;
            }
        };
        const handleResize = () => {
            setPageWidth(getPageWidth());
        };
        setPageWidth(getPageWidth());

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="pt-4 pl-4 md:pl-8 md:pt-8 w-1/12 cursor-pointer hover:text-slate-600">
        <Link href="/">
          <ArrowLeftIcon width={25} height={25} />
        </Link>
      </div>
      <div className="flex flex-col justify-center md:items-start gap-4 md:flex-row md:justify-between px-8">
        <ProgramDetailCard course={course} locale={locale} />
        <div className="flex flex-col items-center">
          <div className="">
            <PDF
                pageWidth={pageWidth}
              url={
                course
                  ? `${supabaseUrl}/storage/v1/object/public/course_detail/${
                      locale === "en" ? "pdf_en" : "pdf"
                    }/${course.id}.pdf`
                  : "#"
              }
            />
          </div>
          <div className="md:hidden flex flex-row items-center justify-center mb-12 mt-8 bg-slate-100 py-3 px-4 rounded-2xl dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-slate-200 transition">
            <OpenInNewWindowIcon />
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={
                course
                  ? `${supabaseUrl}/storage/v1/object/public/course_detail/${
                      locale === "en" ? "pdf_en" : "pdf"
                    }/${course.id}.pdf`
                  : "#"
              }
              className="text-xs text-slate-700 dark:text-white ml-2"
            >
              {course ? t("view_pdf") : null}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CourseDetails;
