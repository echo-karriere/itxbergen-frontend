import { Metadata } from "next";
import ForStudenter from "./karrieredag_for_studenter";

export const metadata: Metadata = {
  title: "Karrieredag for Studenter | ITxBergen",
  description: "Informasjon for studenter som deltar på Karrieredagen",
}

export default function ForStudenterPage() {
  return <ForStudenter />;
}
