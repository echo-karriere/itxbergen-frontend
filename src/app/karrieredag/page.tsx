import { Metadata } from "next";
import Karrieredag from "./karrieredag";

export const metadata: Metadata = {
  title: "Karrieredag | ITxBergen",
  description: "Karrieredag for IT-studenter i Bergen",
}

export default function KarrieredagPage() {
  return <Karrieredag />;
}
