import Image from "next/image";
import initTranslations from "../i18n.js";

export default async function Home({ params: { locale } }) {
  const { t } = await initTranslations(locale, ["default"]);

  return <p>{t("test")}</p>;
}
