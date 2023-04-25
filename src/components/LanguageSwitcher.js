import { useRouter } from "next/router";
import { RiTranslate2 } from "react-icons/ri";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (newLocale) => {
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };

  return (
    <div>
      <RiTranslate2
        onClick={() => changeLanguage(locale === "en" ? "zh" : "en")}
        className="cursor-pointer text-2xl text-slate-900 hover:text-slate-700"
      />
    </div>
  );
};

export default LanguageSwitcher;
