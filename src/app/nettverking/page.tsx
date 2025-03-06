import { Metadata } from "next";
import Nettverking from "./nettverking";

export const metadata: Metadata = {
  title: "ITxBergen - Nettverking",
  description: "Nettverking for IT-studenter i Bergen",
}

export default function NettverkingPage() {
  return <Nettverking />;
}
