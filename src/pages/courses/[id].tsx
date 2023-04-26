import { useRouter } from "next/router";
import { list as enList } from "@/data/en/list";
import { list as zhList } from "@/data/zh/list";
import { list as jaList } from "@/data/ja/list";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useTranslations } from "next-intl";

function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { locale } = router;
  const list = locale === "zh" ? zhList : locale === "ja" ? jaList : enList;
  const course = list.find(
    (c) => c.id === parseInt(typeof id === "string" ? id : "")
  );
  const t = useTranslations("CourseDetails");
  const BASE_URL = "https://elp.xyspg.moe";

  return (
    <>
      <Header />
      <div>
        <div className="pt-4 pl-4 md:pl-8 md:pt-8 w-1/12 cursor-pointer hover:text-slate-600">
          <Link href="/">
            {" "}
            <ArrowLeftIcon width={25} height={25} />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-left text-2xl font-bold m-8">
            {course ? <h1>{course.title}</h1> : <h1>Course not found</h1>}
          </div>
          <div className="mb-8">
            <Image
              src={course ? `/img/${course.id}.png` : ""}
              alt={course ? `${course.title}` : ""}
              width={300}
              height={100}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <OpenInNewWindowIcon />
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={
              course
                ? process.env.NODE_ENV === "production"
                  ? `${BASE_URL}/pdf/${course.pdfUrl}`
                  : `http://localhost:3000/pdf/${course.pdfUrl}`
                : "#"
            }
            className="text-xs text-slate-700 dark:text-white ml-2"
          >
            {course ? t("view_pdf") : null}
          </Link>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
