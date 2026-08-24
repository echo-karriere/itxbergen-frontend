import PageHeader from "./page-header";
import SectionGallery from "./section-gallery";
import SectionCompanies from "./section-companies";
import { Metadata } from "next";
import SectionButtons from "./section-buttons";
import LagTimeplan from "./timeplan";

export const metadata: Metadata = {
  title: "Karrieredag | ITxBergen",
  description: "Karrieredag for IT-studenter i Bergen",
};

export default function Karrieredag() {
  return (
    <>
      <PageHeader />
			<SectionButtons />
      <LagTimeplan />
      <SectionCompanies />
      <SectionGallery />
    </>
  );
}
