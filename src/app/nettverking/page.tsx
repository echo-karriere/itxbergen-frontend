import Otherthings from "@/components/utils/otherthings";
import PageHeader from "./page-header";
import SectionStudentOrganisations from "./section-student-organisations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nettverking | ITxBergen",
  description: "Nettverking for IT-studenter i Bergen",
};

export default function Nettverking() {
  return (
    <div>
      <PageHeader />
      <SectionStudentOrganisations />
      <Otherthings />
    </div>
  );
}
