import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import ExhibitionCard from "../app/components/Exhibitions/Exhibition";
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

export default function Exhibition({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation("exhibitions");
  const mdPlusScreenOrDown = useBreakpointDown("mdPlus");
  const isMobile = useBreakpointDown("md");

  const { locale } = useRouter();

  const cafes = {
    STOCKHOLM_FISK: [
      {
        period: "9 JANUARI - 9 APRIL",
        artists: [
          "Tobbe Ekman",
          "Helena Petersson",
          "Daniel Lundvall",
          "Lisbeth Olofsdotter",
        ],
      },
      {
        period: "11 APRIL - 11 JULI",
        artists: [
          "Marcus Boman",
          "Maria Biederbeck",
          "Orjan Sattre",
          "Sofie Ohlsson",
          "Hesho Serray",
          "Nathalie Tsikritea",
        ],
      },
      {
        period: "11 JULI - 11 OKTOBER",
        artists: [
          "Torill Roselin",
          "Ulrika Hegardh",
          "Jason Andersson",
          "Harriet Strém",
          "Karin Gréonlund",
        ],
      },
      {
        period: "11 OKTOBER - 11 JANUARI",
        artists: [
          "Marie Sandell",
          "Johan Thunberg",
          "Asa Schick",
          "Felix Oppenheim",
          "Yvonne Marténg",
        ],
      },
    ],
    PS_MATSAL: [
      {
        period: "4 APRIL - 4 OKTOBER",
        artists: ["Daniel Lundvall", "Veslemgy Vangsnes"],
      },
      {
        period: "4 OKTOBER - 4 APRIL",
        artists: ["Gunilla Svard", "Rene Jakobsen"],
      },
    ],
    ART_BAKERY: [
      {
        period: "7 MARS - 7 JUNI",
        artists: ["Stina G Olsson", "Ralph Castellan"],
      },
      {
        period: "8 JUNI - 8 SEPTEMBER",
        artists: ["Angelica Diehn", "Carl Bennerstedt"],
      },
      {
        period: "9 SEPTEMBER - 9 DECEMBER",
        artists: ["Susann Karlsson Art", "Hakan Lindskog"],
      },
      {
        period: "10 DECEMBER - 10 MARS",
        artists: ["Sara Bergman", "Ola Lanteli"],
      },
    ],
    NK_CAFE: [
      {
        period: "5 APRIL - 7 JUNI",
        artists: ["Ulrika Melin"],
      },
      {
        period: "7 JUNI - 22 AUGUSTI",
        artists: ["Galina Tol-Fakkar"],
      },
      {
        period: "22 AUGUSTI - 23 OKTOBER",
        artists: ["Radenka Nikola"],
      },
      {
        period: "23 OKTOBER - 22 DECEMBER",
        artists: ["Marie Andersson"],
      },
    ],
    ANGBATSBRYGGAN: [
      {
        period: "All year",
        artists: ["Borje Ahlstrom"],
      },
    ],
    LA_PIAZZA: [
      {
        period: "All year",
        artists: ["Ulrika Melin"],
      },
    ],
  };

  const showrooms = {
    JANUARI: ["Vecka 5 - Zlatko Gradholt"],
    FEBRUARI: [
      "Vecka 7 - Annika Berglof",
      "Vecka 8 - Sara Bergman",
      "Vecka 9 - Helene Westerlund",
    ],
    MARS: [
      "Vecka 10 - Malin Altenby Larsen",
      "Vecka 11 - Jessica Elert",
      "Vecka 12 - Susanne Strandanger",
      "Vecka 13 - Olle Brandqvist",
    ],
    APRIL: [
      "Vecka 15 - Erik Mofjell",
      "Vecka 16 - Anna-Karin Otherhals",
      "Vecka 17 - Viveca Berg",
    ],
    MAJ: [
      "Vecka 18 - Keya Eriksson",
      "Vecka 19 - Annica Hallman",
      "Vecka 20 - Anna Solberg",
      "Vecka 21 - AnnCatrin Pettersson",
      "Vecka 22 - Mieszko Tyszkiewicz",
    ],
    JUNI: [
      "Vecka 23 - Magnus Christiansson",
      "Vecka 24 - Cina Fundin",
      "Vecka 25 - Henrik Sjéstrém",
      "Vecka 26 - Maria Biederbeck",
    ],
    JULI: ["Sommarstängt"],
    AUGUSTI: [
      "Vecka 31 - Hanne Linnes",
      "Vecka 32 - Tove Gulliksrud",
      "Vecka 33 - Sofia Lagerblad",
      "Vecka 34 - Serguei Zlenko",
      "Vecka 35 - Camilla Karlsson",
    ],
    SEPTEMBER: [
      "Vecka 36 - Pia Haland Anveden",
      "Vecka 37 - Lo Fehrling",
      "Vecka 38 - Orjan Satre",
      "Vecka 39 - Anna Lindman",
    ],
    OKTOBER: [
      "Vecka 40 - Jason Andersson",
      "Vecka 41 - Mary Myntti",
      "Vecka 42 - Anna-Carin Jansson",
      "Vecka 43 - Anne Nkeng",
      "Vecka 44 - Ann-Marie Sarri",
    ],
    NOVEMBER: [
      "Vecka 45 - Lars Henrik Milert",
      "Vecka 46 - Jakob Fogelquist",
      "Vecka 47 - Maria Nehlin",
      "Vecka 48 - Ivy Dorisse",
    ],
    DECEMBER: [
      "Vecka 49 - Ann-Britt Farmare",
      "Vecka 50 - Victor Skold",
      "Vecka 51 - Daniel Lundvall",
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
      <Main wide={mdPlusScreenOrDown ? true : false} navBarItems={navBarItems}>
        <Head>
          <title>{t("title")}</title>
        </Head>
        <div className={s.flexContainer}>
          <div className={s.left}>
            <Typography variant="h1" className={s.headline}>
              {t("artportableExhibition")}
            </Typography>
            <Typography variant="h4" className={s.description}>
              {t("exhibitionText")}
            </Typography>
            <Typography variant="h4" className={s.welcomeText}>
              {t("welcomeText")}
            </Typography>
          </div>

          <div className={s.right}>
            <div className={s.frame}>
              <img
                src={`/images/mingel.jpeg`}
                alt="showRoom image"
                className={s.image}
              />
            </div>
          </div>
        </div>
        {/* Cafe Tabs */}
        <TabContext value={selectedCafe}>
          <Tabs
            value={selectedCafe}
            onChange={(event, newCafe) => setSelectedCafe(newCafe)}
            variant="scrollable"
            scrollButtons="on"
          >
            {Object.keys(cafes).map((cafe) => (
              <Tab
                label={cafe
                  .split("_")
                  .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                  .join(" ")}
                value={cafe}
                key={cafe}
              />
            ))}
          </Tabs>

          <Grid container spacing={4}>
            {selectedCafe &&
              cafes[selectedCafe] &&
              cafes[selectedCafe].map((exhibition, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Card
                    className={s.card}
                    style={{ backgroundColor: "#faf3ee" }}
                  >
                    <CardContent style={{ padding: "20px" }}>
                      <Typography variant="h6">{exhibition.period}</Typography>
                      {exhibition.artists.map((artist, j) => (
                        <Typography variant="body1" key={j}>
                          {artist}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabContext>

        <div className={s.divider} />

        <TabContext value={String(value)}>
          <Tabs
            ref={tabsRef}
            value={String(value)}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            {monthNames.map((month, index) => (
              <Tab label={month} key={index} />
            ))}
          </Tabs>

          {Object.keys(showrooms).map((month, index) => (
            <TabPanel value={String(index)} key={index}>
              {showrooms[month].map((showroom, i) => (
                <Typography key={i}>{showroom}</Typography>
              ))}
            </TabPanel>
          ))}
        </TabContext>
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
