import PageHeader from "./page-header";
import SectionCTA from "./section-cta";
import SectionGallery from "./section-gallery";
import SectionCompanies from "./section-companies";
import { Metadata } from "next";
import SectionTimeline from "./section-timeline";
import SectionWorkshops from "./section-workshops";
import SectionAfterparty from "./section-afterparty";

export const metadata: Metadata = {
  title: "Karrieredag | ITxBergen",
  description: "Karrieredag for IT-studenter i Bergen",
};

export default function Karrieredag() {
  return (
    <>
      <PageHeader />
      <SectionTimeline />
      <SectionAfterparty />
      <SectionCompanies />
      <SectionWorkshops />
      {/* <SectionExtraInformation /> */}
      <SectionCTA />
      <SectionGallery />
    </>
  );
}
