import {useRouter} from "next/router";
import {list} from "@/data/list";
import Header from "@/components/Header";
import Link from "next/link";

function CourseDetails() {
    const router = useRouter();
    const {id} = router.query;
    const course = list.find((c) => c.id === parseInt(id));

    return (
        <>
            <Header/>
            <div className="text-center text-2xl font-bold m-8">
                {course ? <h1>{course.title}</h1> : <h1>Course not found</h1>}
            </div>
            <div className="text-center m-8">
            <Link href={course ? `/pdf/${course.pdfUrl}.pdf` : "#"}
            className="bg-cyan-500 hover:bg-cyan-700 text-white rounded m-2 py-2 px-4"
            >
                {course ? "查看PDF" : null}
            </Link>
            </div>
        </>
    );
}


export default CourseDetails;
