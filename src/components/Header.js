import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function Header() {
  return (
    <>
      <div
        className="h-48 md:h-52 bg-slate-200 bg-cover
    flex flex-col justify-center text-black dark:bg-slate-700 relative"
      >
        <div className="absolute top-8 right-8">
          <LanguageSwitcher />
        </div>
        <div className="px-8 md:px-16 dark:text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-left">
            ELP 课程列表
          </h1>
          <h2 className="font-sans text-1xl md:pt-2 text-left">
            Experience Learning Program
          </h2>
        </div>
      </div>
      <hr className="border-slate-400 " />
    </>
  );
}

export default Header;
