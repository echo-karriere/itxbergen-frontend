import { Metadata } from "next";
import Karrieredag from "./karrieredag";

export const metadata: Metadata = {
  title: "ITxBergen - Karrieredag",
  description: "Karrieredag for IT-studenter i Bergen",
}

export default function KarrieredagPage() {
  return <Karrieredag />;
}
