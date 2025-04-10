import { Metadata } from "next";
import KarakterKalkulator from "./karakterkalkulator";

export const metadata: Metadata = {
  title: "Karakterkalkulator | ITxBergen",
  description: "Karakterkalkulator for studenter",
};

export default function KarakterKalkulatorPage() {
  return <KarakterKalkulator />;
}
