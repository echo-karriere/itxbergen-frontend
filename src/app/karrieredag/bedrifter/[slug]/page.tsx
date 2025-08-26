import { headers } from "next/headers";
import Custom404 from "@/app/404";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";


const info = [
  {
    "Bedrift": "BEKK CONSULTING AS",
    "Organisasjonsnummer": 981566378,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "TRUE",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "BERGEN NÆRINGSRÅD",
    "Organisasjonsnummer": 961744776,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "BKK AS",
    "Organisasjonsnummer": 976944801,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "BOUVET NORGE AS",
    "Organisasjonsnummer": 996756246,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "CAPGEMINI NORGE AS",
    "Organisasjonsnummer": 943574537,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "COMPUTAS AS",
    "Organisasjonsnummer": 986352325,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "", "Betalt": "TRUE"
  },
  {
    "Bedrift": "DIGITALISERINGSDIREKTORATET",
    "Organisasjonsnummer": 991825827,
    "Offentlig": "Ja",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "DNB BANK ASA",
    "Organisasjonsnummer": 984851006,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "TRUE",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "DNV AS",
    "Organisasjonsnummer": 945748931,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "EQUINOR ASA",
    "Organisasjonsnummer": 923609016,
    "Offentlig": "Ja",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "ERNST & YOUNG AS",
    "Organisasjonsnummer": 976389387,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "Frende Forsikring",
    "Organisasjonsnummer": 991436960,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "TRUE",
    "ITxGalla": "TRUE",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "INTILITY AS",
    "Organisasjonsnummer": 981967070,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "JetBrains",
    "Organisasjonsnummer": 511430303,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "KANTEGA AS",
    "Organisasjonsnummer": 985815534,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "TRUE",
    "ITxGalla": "TRUE",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "KNOWIT EXPERIENCE BERGEN AS",
    "Organisasjonsnummer": 914727170,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "KS Digital",
    "Organisasjonsnummer": 931796003,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "LERØY SEAFOOD GROUP ASA",
    "Organisasjonsnummer": 975350940,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "NETCOMPANY NORWAY AS",
    "Organisasjonsnummer": 881886472,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "NORDEA LIV FORSIKRING AS",
    "Organisasjonsnummer": 959922659,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "NORGES BANK",
    "Organisasjonsnummer": 937884117,
    "Offentlig": "Ja",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "TRUE",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "NORGESGRUPPEN DATA AS",
    "Organisasjonsnummer": 971047917,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "NORKART AS",
    "Organisasjonsnummer": 934161181,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "TRUE",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "SIKT - KUNNSKAPSSEKTORENS TJENESTELEVERANDØR",
    "Organisasjonsnummer": 919477822,
    "Offentlig": "Ja",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "SKATTEETATEN",
    "Organisasjonsnummer": 974761076,
    "Offentlig": "Ja",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "SOPRA STERIA AS",
    "Organisasjonsnummer": 910909088,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "SPAREBANK 1 UTVIKLING DA",
    "Organisasjonsnummer": 986401598,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "STACC AS",
    "Organisasjonsnummer": 981078365,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "STARTUPLAB VESTLAND AS",
    "Organisasjonsnummer": 935490588,
    "Offentlig": "Ja",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "STATENS VEGVESEN",
    "Organisasjonsnummer": 971032081,
    "Offentlig": "Ja",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "STATNETT SF",
    "Organisasjonsnummer": 962986633,
    "Offentlig": "Ja",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "TRUE",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "STATSFORVALTERENS FELLESTJENESTER",
    "Organisasjonsnummer": 921627009,
    "Offentlig": "Ja",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "TRUE",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "TIETOEVRY NORWAY AS",
    "Organisasjonsnummer": 933012867,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "TRUE",
    "ITxGalla": "TRUE",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "TV 2 AS",
    "Organisasjonsnummer": 979484534,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  },
  {
    "Bedrift": "TWODAY AS",
    "Organisasjonsnummer": 990432368,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "TRUE",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "UNI MICRO AS",
    "Organisasjonsnummer": 925141623,
    "Offentlig": "Nei",
    "Lynpresentasjon": "TRUE",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": "TRUE"
  },
  {
    "Bedrift": "ZRCH AS",
    "Organisasjonsnummer": 928013405,
    "Offentlig": "Nei",
    "Lynpresentasjon": "",
    "Workshop": "",
    "ITxGalla": "",
    "Leveranse": "",
    "Policy": "TRUE",
    "Faktura sendt?": "",
    "Betalt": ""
  }
]



const Page = () => {
  const headerList = headers();
  const id = Number(headerList.get("x-current-path")?.split("/").pop());
  if (id) {
    const organization = info.find((current) => {
      return current.Organisasjonsnummer === id
    })
    console.log(id)
    if (organization) {
      return (
        <div className="justify-center">
          <div className="maxwidth md:pt-[4.5rem] pt-4 px-[1.8rem] md:px-32">
            <Breadcrumbs customLast={`${organization.Bedrift}`} />
            <h1 className="text-3xl md:text-4xl font-bold pb-8 pt-4">{organization.Bedrift} er påmeldt karrieredagen!</h1>

            <div className="flex flex-col md:flex-row pb-14">
              <div className="md:w-[60%] md:mr-3 w-[80%]">
                <h2 className="text-2xl pb-4 font-bold">Valgte tilleggstjenester:</h2>
                <ul>
                  <li>Lynpresentasjon: {organization.Lynpresentasjon == "TRUE" ? "JA" : "NEI"}</li>
                  <li>ITxGalla: {organization.ITxGalla == "TRUE" ? "JA" : "NEI"}</li>
                  <li>Workshop: {organization.Workshop == "TRUE" ? "JA" : "NEI"}</li>
                  <li>Leveranse: {organization.Leveranse == "TRUE" ? "JA" : "NEI"}</li>
                </ul>
                <div className="pt-5 font-bold">Betalt: {organization.Betalt == "TRUE" ? "JA" : "NEI"}</div>
              </div>
            </div>
          </div>
        </div>)
    } else {
      return <div>Vi fant dessverre ikke organisasjonen din i listen våres over påmeldte bedrifter:(</div>
    }
  } else {
    return (
      <div><Custom404 /></div>
    )

  }
}

export default Page
