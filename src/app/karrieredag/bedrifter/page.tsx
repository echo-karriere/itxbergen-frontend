import { Metadata } from "next";
import ForBedrifter from "./karrieredag_for_bedrifter";

export const metadata: Metadata = {
  title: "ITxBergen - Karrieredag Bedrifter",
  description: "Informasjon for Bedrifter som deltar på Karrieredagen",
}

export default function ForStudenterPage() {
  return <ForBedrifter />;
}
