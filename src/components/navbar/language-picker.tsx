'use client'

import { useState } from "react";

enum Language {
  NO = "NO",
  EN = "EN",
};

export default function LanguagePicker() {
  const [language, setLangauge] = useState<Language>(Language.NO);

  const toggleLanguage = () => {
    setLangauge((prev) => (prev === Language.NO ? Language.EN : Language.NO));
  };

  return (
    <div onClick={toggleLanguage} className="cursor-pointer inline-flex gap-2">
      <span
        className={language === 'NO'
          ? 'text-IXBfg border-b-2 border-IXBfg text-sm'
          : 'text-white text-sm'}>
        NO
      </span>

      <span className="text-white text-sm">/</span>

      <span
        className={language === 'EN'
          ? 'text-IXBfg border-b-2 border-IXBfg text-sm'
          : 'text-white text-sm'}>
        EN
      </span>
    </div>
  );
}
