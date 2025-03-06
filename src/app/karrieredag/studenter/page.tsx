import { Metadata } from "next";
import ForStudenter from "./karrieredag_for_studenter";

export const metadata: Metadata = {
  title: "ITxBergen - Karrieredag Studenter",
  description: "Informasjon for studenter som deltar på Karrieredagen",
}

export default function ForStudenterPage() {
  return <ForStudenter />;
}
