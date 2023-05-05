import { useRouter } from "next/router";
import { list as enList } from "@/data/en/list";
import { list as zhList } from "@/data/zh/list";
import { list as jaList } from "@/data/ja/list";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PDF from "@/components/PDF";
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

  return (
    <main className="flex flex-col min-h-screen">
        <Header />
        <div>
          <div className="pt-4 pl-4 md:pl-8 md:pt-8 w-1/12 cursor-pointer hover:text-slate-600">
            <Link href="/">
              {" "}
              <ArrowLeftIcon width={25} height={25} />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-around" >
            <div className='flex flex-col items-center'>
            <div className="text-left text-2xl font-bold m-8 max-w-2xl">
              {course ? <h1>{course.title}</h1> : <h1>Course not found</h1>}
            </div>
            <div className="mb-8 flex flex-col items-center">
              <Image
                src={
                  course
                    ? `${supabaseUrl}/storage/v1/object/public/course_detail/img/${course.id}.png`
                    : ""
                }
                alt={course ? `${course.title}` : ""}
                width={300}
                height={100}
              />
              <div className="hidden md:flex my-8 flex-row items-center justify-center mb-12 bg-slate-100 py-3 px-4 rounded-2xl dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-slate-200 transition w-36 ">
                <OpenInNewWindowIcon />
                <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href={
                      course
                          ? `${supabaseUrl}/storage/v1/object/public/course_detail/${locale === 'en' ? 'pdf_en' : 'pdf'}/${course.id}.pdf`
                          : "#"
                    }
                    className="text-xs text-slate-700 dark:text-white ml-2"
                >
                  {course ? t("view_pdf") : null}
                </Link>
              </div>
            </div>
            </div>
            <div className='flex flex-col items-center'>
            <div className=''>
              <PDF url={course
                  ? `${supabaseUrl}/storage/v1/object/public/course_detail/${locale === 'en' ? 'pdf_en' : 'pdf'}/${course.id}.pdf`
                  : "#"}/>
            </div>
            <div className="md:hidden flex flex-row items-center justify-center mb-12 mt-8 bg-slate-100 py-3 px-4 rounded-2xl dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-slate-200 transition" >
              <OpenInNewWindowIcon />
              <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href={
                    course
                        ? `${supabaseUrl}/storage/v1/object/public/course_detail/${locale === 'en' ? 'pdf_en' : 'pdf'}/${course.id}.pdf`
                        : "#"
                  }
                  className="text-xs text-slate-700 dark:text-white ml-2"
              >
                {course ? t("view_pdf") : null}
              </Link>
            </div>
            </div>
          </div>

        </div>
    </main>
  );
}

export default CourseDetails;
