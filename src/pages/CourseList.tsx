import { list as enList } from "@/data/en/list";
import { list as zhList } from "@/data/zh/list";
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
  const [filteredCourses, setFilteredCourses] = useState([]);
  const router = useRouter();
  const { locale } = router;
  const list = locale === "zh" ? zhList : enList;

  const [categories, setCategories] = useState({});

  useEffect(() => {
    setCategories(getCategories(list));
  }, [locale]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCourses(categories[selectedCategory]);
    } else {
      setFilteredCourses(list);
    }
  }, [selectedCategory, categories]);

  const selectText = locale === "zh" ? "选择课程类型" : "Select Category";
  const selectTextPlaceholder = locale === "zh" ? "全部课程" : "All Courses";
  const day = locale === "zh" ? "天" : "days";
  const cost = locale === "zh" ? "元" : "RMB";

  return (
    <>
      <div className="h-full w-full max-w-md px-4 py-8 sm:px-0 shadow-sm ">
        <div className="ml-2 mb-4">
          <p className="text-slate-800 text-xs mb-1 dark:text-white">
            {selectText}
          </p>
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={selectTextPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={null}
                onSelect={() => setSelectedCategory(null)}
              >
                {selectTextPlaceholder}
              </SelectItem>
              {Object.keys(categories).map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  onSelect={() => setSelectedCategory(category)}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ul>
          {filteredCourses.map(
            (post: {
              category: string;
              id: Key;
              title: string;
              duration: number;
              cost: number;
            }) => (
              <li
                key={post.id}
                className="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <h3 className="text-sm font-medium leading-5 dark:text-white">
                  {post.title}
                </h3>

                <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 dark:text-gray-100">
                  <li>
                    {post.duration} {day}
                  </li>
                  <li>&middot;</li>
                  <li>
                    {post.cost} {cost}
                  </li>
                  <li>&middot;</li>
                  <li>{post.category}</li>
                </ul>
                <Link
                  href={`/courses/${post.id}`}
                  className={classNames(
                    "absolute inset-0 rounded-md",
                    "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                  )}
                ></Link>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default CourseList;