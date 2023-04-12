import { useRouter } from "next/router";
import { list } from "@/data/list";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeftIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";

function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const course = list.find((c) => c.id === parseInt(typeof id === "string" ? id : ""));

  return (
    <>
      <Header />
      <div className="pt-4 pl-4 md:pl-8 md:pt-8 w-1/12 cursor-pointer">
        <Link href="/">
          {" "}
          <ArrowLeftIcon width={25} height={25} />
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-left text-2xl font-bold m-8">
          {course ? <h1>{course.title}</h1> : <h1>Course not found</h1>}
        </div>
        <div className="">
          {/*<Image src={course ? `/pdf/${course.imgUrl}` : ""} alt={'course image'} width={300} height={100}/>*/}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <OpenInNewWindowIcon />
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={course ? `/pdf/${course.pdfUrl}.pdf` : "#"}
          className="text-xs text-slate-700 dark:text-white ml-2"
        >
          {course ? "查看PDF" : null}
        </Link>
      </div>
    </>
  );
}

export default CourseDetails;
