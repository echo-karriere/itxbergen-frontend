import PageHeader from "./page-header";
import SectionCTA from "./section-cta";
import SectionGallery from "./section-gallery";
import SectionCompanies from "./section-companies";
import { Metadata } from "next";
import SectionTimeLine from "./section-timeline";
import SectionWorkshops from "./section-workshops";

export const metadata: Metadata = {
  title: "Karrieredag | ITxBergen",
  description: "Karrieredag for IT-studenter i Bergen",
};

export default function Karrieredag() {
  return (
    <>
      <PageHeader />
      <SectionTimeLine />
      <SectionCompanies />
      <SectionWorkshops />
      <SectionCTA />
      <SectionGallery />
    </>
  );
}
