'use client'

import { useState, useEffect } from "react";

enum Language {
  NO = "NO",
  EN = "EN",
};

export default function LanguagePicker() {
  const [language, setLanguage] = useState<Language>(Language.NO);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === Language.NO ? Language.EN : Language.NO;
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);  // Save language to localStorage
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
