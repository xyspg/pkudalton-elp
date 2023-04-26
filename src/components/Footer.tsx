import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import {useTranslations} from "next-intl";

const Footer = () => {
  const router = useRouter();
  const { locale } = router;
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const darkMode = currentTheme === "dark";
  const t = useTranslations("Footer");

  const changeLanguage = (newLocale) => {
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };
  return (
    <>
      <div className="text-slate-500 dark:text-slate-300 text-center text-xs p-4">
        <span
          onClick={() => changeLanguage("zh")}
          className="cursor-pointer hover:text-slate-700  dark:hover:text-slate-100"
        >
          中文
        </span>
        <span className="mx-2">|</span>
        <span
          className="cursor-pointer hover:text-slate-700 dark:hover:text-slate-100"
          onClick={() => changeLanguage("en")}
        >
          English
        </span>
        <span className="mx-2">|</span>
        <span
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
          className={`text-${
            darkMode ? "white" : "black"
          } cursor-pointer text-center text-xs text-slate-500 dark:text-slate-300 dark:hover:text-slate-100`}
        >
          {darkMode ? t("lightMode") : t("darkMode")}
        </span>
      </div>
    </>
  );
};

export default Footer;
