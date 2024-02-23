import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import { styles } from "../styles/exhibitions.css";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { useRouter } from "next/router";
import { Tabs, Tab, CardHeader } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import Showroom from "../app/components/Showroom/Showroom";

export default function Exhibition({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation("exhibitions");
  const mdPlusScreenOrDown = useBreakpointDown("mdPlus");
  const isMobile = useBreakpointDown("md");
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale } = useRouter();

  const cafes = {
    MELANDERS: [
      {
        period: "17 JANUARI - 17 APRIL",
        artists: [
          { name: "Bitte Brun", username: "Bitte.Brun" },
          { name: "Linda Lundin", username: "linda" },
          { name: "Lo Fehrling", username: "lo" },
        ],
        site: "www.melanders.se/restauranger/melanders-sodermalm/",
      },
      {
        period: "17 APRIL - 17 JULI",
        artists: [
          { name: "Annica Hallman", username: "Annica.b" },
          { name: "Annika Berglöf", username: "annika.berglof" },
          { name: "Yvonne Marténg", username: "yvonne" },
        ],
        site: "www.melanders.se/restauranger/melanders-sodermalm/",
      },
    ],
    PS_MATSAL: [
      {
        period: "4 APRIL - 4 OKTOBER",
        artists: [
          { name: "Daniel Lundvall", username: "daniel.lundvall" },
          { name: "Veslemøy Vangsnes", username: "veslemoy.vangsnes" },
        ],
        site: "www.psmatsal.com/new-startpage/",
      },
      {
        period: "4 OKTOBER - 4 APRIL",
        artists: [
          { name: "Gunilla Svärd", username: "gunilla.svard" },
          { name: "Rene Jakobsen", username: "rene.jakobsen" },
        ],
        site: "www.psmatsal.com/new-startpage/",
      },
    ],
    ART_BAKERY: [
      {
        period: "7 MARS - 7 JUNI",
        artists: [
          { name: "Stina G Olsson", username: "stina.g.olsson.art" },
          { name: "Ralph Castellan", username: "rc-art" },
        ],
        site: "www.artbakery.se/",
      },
      {
        period: "8 JUNI - 8 SEPTEMBER",
        artists: [
          { name: "Angelica Diehn", username: "angelica.diehn" },
          { name: "Carl Bennerstedt", username: "cabem" },
        ],
        site: "www.artbakery.se/",
      },
      {
        period: "11 SEPTEMBER - 11 DECEMBER",
        artists: [
          { name: "Göran Billingskog", username: "gorito" },
          { name: "Håkan Lindskog", username: "hakan" },
        ],
        site: "www.artbakery.se/",
      },
      {
        period: "10 DECEMBER - 10 MARS",
        artists: [
          { name: "Sara Bergman", username: "s_bergman1" },
          { name: "Ola Lanteli", username: "ola" },
        ],
        site: "www.artbakery.se/",
      },
    ],
    NK_CAFE: [
      {
        period: "5 APRIL - 7 JUNI",
        artists: [{ name: "Ulrika Melin", username: "ulrikaart" }],
        site: "www.nk.se/avdelningar/stockholm/art-cafe?ssw=1",
      },
      {
        period: "7 JUNI - 22 AUGUSTI",
        artists: [{ name: "Galina Tol-Fakkar", username: "galina.tolfakkar" }],
        site: "www.nk.se/avdelningar/stockholm/art-cafe?ssw=1",
      },
      {
        period: "22 AUGUSTI - 23 OKTOBER",
        artists: [{ name: "Radenka Nikola", username: "radenka.art" }],
        site: "www.nk.se/avdelningar/stockholm/art-cafe?ssw=1",
      },
      {
        period: "23 OKTOBER - 22 DECEMBER",
        artists: [{ name: "Marie Andersson", username: "marieannersa" }],
        site: "www.nk.se/avdelningar/stockholm/art-cafe?ssw=1",
      },
    ],
    ÅNGBATSBRYGGAN: [
      {
        period: "All year",
        artists: [{ name: "Börje Ahlström", username: "ahlstrom1950" }],
        site: "www.angbatsbryggan.com/",
      },
    ],
    LA_PIAZZA: [
      {
        period: "All year",
        artists: [{ name: "Ulrika Melin", username: "ulrikaart" }],
        site: "www.lapiazzadjursholm.se/",
      },
    ],
  };

  const showrooms = {
    JANUARI: [
      {
        week: "Vecka 2",
        artist: "Torleiv Agdestein",
        username: "torleiv.agdestein",
      },
      {
        week: "Vecka 3",
        artist: "Torleiv Agdestein",
        username: "torleiv.agdestein",
      },
      {
        week: "Vecka 4",
        artist: "Elaine Hillerström",
        username: "elaine.hillerstrom",
      },
    ],
    FEBRUARI: [
      {
        week: "Vecka 7",
        artist: "Annika Berglof",
        username: "annika.berglof",
      },
      {
        week: "Vecka 8",
        artist: "Sara Bergman",
        username: "s_bergman1",
      },
      {
        week: "Vecka 9",
        artist: "Helene Westerlund",
        username: "artuditech",
      },
    ],
    MARS: [
      {
        week: "Vecka 10",
        artist: "Malin Altenby Larsen",
        username: "malinlarsenart",
      },
      {
        week: "Vecka 11",
        artist: "Jessica Elert",
        username: "Jessicaelert",
      },
      {
        week: "Vecka 12",
        artist: "Susanne Strandanger",
        username: "Susanne",
      },
      {
        week: "Vecka 13",
        artist: "Olle Brandqvist",
        username: "olle.brandqvist",
      },
    ],
    APRIL: [
      {
        week: "Vecka 15",
        artist: "Erik Mofjell",
        username: "erik.mofjell",
      },
      {
        week: "Vecka 16",
        artist: "Anna-Karin Otherhals",
        username: "anna-karin.oterhals",
      },
      {
        week: "Vecka 17",
        artist: "Viveca Berg",
        username: "viveca.berg",
      },
    ],
    MAJ: [
      {
        week: "Vecka 18",
        artist: "Keya Eriksson",
        username: "keya.eriksson",
      },
      {
        week: "Vecka 19",
        artist: "Annica Hallman",
        username: "Annica.b",
      },
      {
        week: "Vecka 20",
        artist: "Anna Solberg",
        username: "anna.solberg",
      },
      {
        week: "Vecka 21",
        artist: "AnnCatrin Pettersson",
        username: "frifararen",
      },
      {
        week: "Vecka 22",
        artist: "Mieszko Tyszkiewicz",
        username: "mieszko.tyszkiewicz",
      },
    ],
    JUNI: [
      {
        week: "Vecka 23",
        artist: "Magnus Christiansson",
        username: "magnus.christiansson",
      },
      {
        week: "Vecka 24",
        artist: "Cina Fundin",
        username: "cina.fundin",
      },
      {
        week: "Vecka 25",
        artist: "Henrik Sjöström",
        username: "henrik.sjostrom",
      },
      {
        week: "Vecka 26",
        artist: "Maria Biederbeck",
        username: "maria.biederbeck",
      },
    ],
    JULI: [
      {
        week: "Sommarstängt",
        artist: "",
        username: "",
      },
    ],
    AUGUSTI: [
      {
        week: "Vecka 31",
        artist: "Hanne Linnes",
        username: "hannelinnes",
      },
      {
        week: "Vecka 32",
        artist: "Tove Gulliksrud",
        username: "tove.gulliksrud",
      },
      {
        week: "Vecka 33",
        artist: "Sofia Lagerblad",
        username: "sofia.lagerblad",
      },
      {
        week: "Vecka 34",
        artist: "Serguei Zlenko",
        username: "sergueizlenko",
      },
      {
        week: "Vecka 35",
        artist: "Camilla Karlsson",
        username: "Camilla.Karlsson",
      },
    ],
    SEPTEMBER: [
      {
        week: "Vecka 36",
        artist: "Pia Håland Anveden",
        username: "piahd53",
      },
      {
        week: "Vecka 37",
        artist: "Lo Fehrling",
        username: "lo",
      },
      {
        week: "Vecka 38",
        artist: "Örjan Sätre",
        username: "orjan.satre",
      },
      {
        week: "Vecka 39",
        artist: "Sirpa Jokela",
        username: "jokela-art",
      },
    ],
    OKTOBER: [
      {
        week: "Vecka 40",
        artist: "Jason Andersson",
        username: "jasonandersson",
      },
      {
        week: "Vecka 41",
        artist: "Mary Myntti",
        username: "marymyntti",
      },
      {
        week: "Vecka 42",
        artist: "Anna-Carin Jansson",
        username: "Anna-Carin.Jansson",
      },
      {
        week: "Vecka 43",
        artist: "Kari Malm",
        username: "kamidas",
      },
      {
        week: "Vecka 44",
        artist: "Ilias Maniouras",
        username: "ilias.maniouras",
      },
    ],
    NOVEMBER: [
      {
        week: "Vecka 45",
        artist: "Lars Henrik Milert",
        username: "milert",
      },
      {
        week: "Vecka 46",
        artist: "Jakob Fogelquist",
        username: "jakob.fogelquist",
      },
      {
        week: "Vecka 47",
        artist: "Maria Nehlin",
        username: "maria.nehlin",
      },
      {
        week: "Vecka 48",
        artist: "Hans-Olof Dahlgren",
        username: "hans-o",
      },
    ],
    DECEMBER: [
      {
        week: "Vecka 49",
        artist: "Ann-Britt Farmare",
        username: "ann-britt.farmare",
      },
      {
        week: "Vecka 50",
        artist: "Victor Sköld",
        username: "wiehre",
      },
      {
        week: "Vecka 51",
        artist: "Daniel Lundvall",
        username: "daniel.lundvall",
      },
    ],
  };

  const currentDate = new Date();
  const currentMonth = currentDate
    .toLocaleString(locale, { month: "long" })
    .toUpperCase();

  const monthNames = Object.keys(showrooms);
  const currentMonthIndex = monthNames.indexOf(currentMonth);

  const [value, setValue] = useState(currentMonthIndex);
  const [selectedCafe, setSelectedCafe] = useState(Object.keys(cafes)[0]);

  const handleChange = (event, newValue) => {
    setValue(parseInt(newValue, 10));
  };

  const tabsRef = useRef(null);

  return (
    <>
      <Main fullWidth={true} navBarItems={navBarItems}>
        <Head>
          <title>{t("title")}</title>

          <meta name="description" content={t("artportableExhibition")} />
          <meta name="url" content="https://artportable.com/showroom" />
          <link rel="canonical" href={`${publicUrl}/${locale}/showroom`} />
        </Head>
        <Showroom></Showroom>
      </Main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "footer",
        "header",
        "gdpr",
        "support",
        "plans",
        "exhibitions",
      ])),
    },
    revalidate: 60,
  };
}
