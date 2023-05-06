import React from 'react';
import Image from "next/image";
import {OpenInNewWindowIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {useTranslations} from "next-intl";

const ProgramDetailCard = ({course, locale}) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const t = useTranslations("CourseDetails");
    return (
        <div>
            <div className="mt-4 flex flex-col items-center max-w-xl border-slate-200 dark:border-slate-700 border-2 rounded-lg">
                <div className="text-left text-slate-800 dark:text-slate-300 text-xl font-bold m-8 max-w-2xl">
                    {course ? <h1>{course.title}</h1> : <h1>Course not found</h1>}
                    <hr
                    className='mt-2'
                    />
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
        </div>
    );
};

export default ProgramDetailCard;
