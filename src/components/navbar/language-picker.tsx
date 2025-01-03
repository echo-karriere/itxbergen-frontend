'use client'

import { useState } from "react"

export default function LanguagePicker() {
  const [language, setLangauge] = useState('NO');

  const toggleLanguage = () => {
    setLangauge((prev) => (prev === "NO" ? "EN" : 'NO'));
  }

  return (
    <div onClick={toggleLanguage} className="cursor-pointer inline-flex gap-2">
      <span className={language === 'NO' ? 'text-IXBfg underline text-sm' : 'text-white text-sm'}>NO</span>
      <span className="text-white text-sm">/</span>
      <span className={language === 'EN' ? 'text-IXBfg underline text-sm' : 'text-white text-sm'}>EN</span>
    </div>
  );
}
