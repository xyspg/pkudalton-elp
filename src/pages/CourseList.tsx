import Link from "next/link";
import { Key, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getCategories = (courseList) => {
  const categoryObj = {};
  courseList.forEach((course) => {
    if (categoryObj[course.category]) {
      categoryObj[course.category].push(course);
    } else {
      categoryObj[course.category] = [course];
    }
  });
  return categoryObj;
};

const CourseList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();
  const { locale } = router;

  const { data, error } = useSWR(
    `/api/courses?locale=${locale}&category=${selectedCategory || ""}`,
    fetcher
  );

  const { data: categoryData, error: categoryError } = useSWR(
    `/api/category?locale=${locale}`,
    fetcher
  );

  const categoryList = categoryData?.list || [];

  const list = data?.list || [];
  const t = useTranslations("CourseList");

  const [categories, setCategories] = useState({});

  useEffect(() => {
    setCategories(getCategories(list));
  }, [list, locale]);

  useEffect(() => {
    setSelectedCategory(null);
  }, [locale]);

  if (error) {
    return (
      <div className="text-red-500 text-sm m-4">
        {t("error", { errorText: error.message })}
      </div>
    );
  }

  return (
    <>
      <div className="h-full w-full max-w-md px-4 py-8 sm:px-0 m-2">
        <div className="ml-2 mb-4">
          <p className="text-slate-800 text-xs mb-1 dark:text-white">
            {t("selectText")}
          </p>
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue
                placeholder={selectedCategory || t("selectTextPlaceholder")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={null}
                onSelect={() => setSelectedCategory(null)}
              >
                {t("selectTextPlaceholder")}
              </SelectItem>
              {categoryList.map((category) => (
                <SelectItem
                  key={category.category}
                  value={category.category}
                  onSelect={() => setSelectedCategory(category.category)}
                >
                  {category.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ul className="flex flex-col space-y-1 h-full">
          {!data && (
            <div className="m-4 text-slate-700 text-sm text-center">
              Loading...
            </div>
          )}
          {list.map(
            (post: {
              category: string;
              id: Key;
              title: string;
              duration: number;
              lower_cost: number;
              upper_cost: number;
              location: string;
              accommodation: number | null;
            }) => (
              <>
                <li
                  key={post.id}
                  className="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <h3 className="text-sm font-medium leading-5 dark:text-white">
                    {post.title}
                  </h3>

                  <ul className="mt-1 flex flex-wrap gap-x-1 text-xs font-normal leading-4 text-gray-500 dark:text-gray-100 ">
                    <li>{post.category}</li>
                    <li>&middot;</li>
                    <li>{post.location}</li>
                    <li>&middot;</li>
                    <li>
                      {post.duration} {t("day")}
                    </li>

                    {locale === "zh" && (
                      <>
                        <li>&middot;</li>
                        <li>
                          {post.lower_cost === post.upper_cost ? (
                            <>
                              {post.lower_cost}
                              {t("cost")}
                            </>
                          ) : (
                            <>
                              {post.lower_cost}
                              <span>-</span>
                              {post.upper_cost}
                              {t("cost")}
                            </>
                          )}
                        </li>
                      </>
                    )}
                    {post.accommodation && (
                      <>
                        <li>&middot;</li>
                        <li>
                          {t("accommodation", { accday: post.accommodation })}
                        </li>
                      </>
                    )}
                  </ul>
                  <Link
                    href={`/courses/${post.id}`}
                    className={classNames(
                      "absolute inset-0 rounded-md",
                      "ring-slate-400 focus:z-10 focus:outline-none focus:ring-2"
                    )}
                  ></Link>
                </li>
                <hr className="mx-2 border-slate-200 dark:border-slate-700" />
              </>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default CourseList;
