import PageHeader from "./page-header";
import SectionCTA from "./section-cta";
import SectionGallery from "./section-gallery";
import SectionCompanies from "./section-companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karrieredag | ITxBergen",
  description: "Karrieredag for IT-studenter i Bergen",
};

export default function Karrieredag() {
  return (
    <>
      <PageHeader />
      <SectionCTA />
      <SectionGallery />
      <SectionCompanies />
    </>
  );
}
