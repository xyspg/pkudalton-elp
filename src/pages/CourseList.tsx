import { list } from "@/data/list";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CourseList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const categoryObj = {};
    list.forEach((course) => {
      if (categoryObj[course.category]) {
        categoryObj[course.category].push(course);
      } else {
        categoryObj[course.category] = [course];
      }
    });

    if (selectedCategory) {
      setFilteredCourses(categoryObj[selectedCategory]);
    } else {
      setFilteredCourses(list);
    }
  }, [selectedCategory]);

  let [categories] = useState(() => {
    const categoryObj = {};
    list.forEach((course) => {
      if (categoryObj[course.category]) {
        categoryObj[course.category].push(course);
      } else {
        categoryObj[course.category] = [course];
      }
    });
    return categoryObj;
  });
  console.log(filteredCourses);
  return (
    <>
      <div className="h-full w-full max-w-md px-4 py-16 sm:px-0 shadow-sm ">
        <div className="ml-2 mb-4">
          <p className="text-slate-800 text-xs mb-1 dark:text-white">
            选择课程类别
          </p>
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="全部课程" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={null}
                onSelect={() => setSelectedCategory(null)}
              >
                全部课程
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
                  <li>{post.duration} 天</li>
                  <li>&middot;</li>
                  <li>{post.cost} 元</li>
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
