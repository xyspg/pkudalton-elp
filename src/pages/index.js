import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { list } from "@/data/list";
import Header from "@/components/Header";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function List() {
  let [categories] = useState(() => {
    // Create an object to group the courses by category
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

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"

                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.duration} 天</li>
                      <li>&middot;</li>
                      <li>{post.cost} 元</li>
                    </ul>
                    <Link
                      href={`/courses/${post.id}`}
                      className={classNames(
                        "absolute inset-0 rounded-md",
                        "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                      )}
                    ></Link>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>ELP课程列表</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="lg: flex justify-center align-center">
          <List />
        </div>
      </main>
    </>
  );
}
