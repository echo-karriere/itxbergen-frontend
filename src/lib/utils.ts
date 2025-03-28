import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const companyLogos = [
  "sparebanken-vest.png",
  "amitec.png",
  "aritma.png",
  "avo.png",
  "skatteetaten.png",
  "sopra_steria.png",
  "bergen_næringsråd.png",
  "bkk.png",
  "bouvet.png",
  "capgemini.png",
  "statens_vegvesen.png",
  "tietoevry.png",
  "cgi.png",
  "computas.png",
  "deloitte.png",
  "digdir.png",
  "twoday.png",
  "vestland_fylkeskommune.png",
  "dnb.png",
  "dnv.png",
  "equinor.png",
  "ey.png",
  "sparebank_1.png",
  "itera.png",
  "kantega.png",
  "knowit.png",
  "machina.png",
  "tryg.png",
  "miles.png",
  "netcompany.png",
  "nordea.png",
  "norgesgruppen.png",
  "vitec.png",
  "norkart.png",
  "pwc.png",
  "sikt.png",
  "simula.png",
  "stacc.png",
  "tv2.png",
  "accenture.png",
  "intility.png",
  "bekk.png",
]
