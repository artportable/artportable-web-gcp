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
import { alignProperty } from "@mui/material/styles/cssUtils";

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
          { name: "Tobbe Ekman", username: "tobbe.ekman" },
          { name: "Helena Petersson", username: "helena.petersson" },
          { name: "Daniel Lundvall", username: "daniel.lundvall" },
          { name: "Lisbeth Olofsdotter", username: "lisbeth.olofsdotter" },
        ],
        site: "www.stockholmfisk.se",
      },
      {
        period: "11 APRIL - 11 JULI",
        artists: [
          { name: "Marcus Boman", username: "marcus.boman" },
          { name: "Maria Biederbeck", username: "maria.biederbeck" },
          { name: "Örjan Sätre", username: "orjan.satre" },
          { name: "Sofie Ohlsson", username: "sofie.ohlsson" },
          { name: "Hesho Serray", username: "hesho.serray" },
          { name: "Nathalie Tsikritea", username: "nattiz_t" },
        ],
        site: "www.stockholmfisk.se",
      },
      {
        period: "11 JULI - 11 OKTOBER",
        artists: [
          { name: "Torill Roselin", username: "torill.roselin" },
          { name: "Ulrika Hegårdh", username: "ulrikahegardh" },
          { name: "Jason Andersson", username: "jasonandersson" },
          { name: "Harriet Ström", username: "haje" },
          { name: "Karin Grönlund", username: "karin.gronlund" },
        ],
        site: "www.stockholmfisk.se",
      },
      {
        period: "11 OKTOBER - 11 JANUARI",
        artists: [
          { name: "Marie Sandell", username: "marie.sandell" },
          { name: "Johan Thunberg", username: "johanthunberg52" },
          { name: "Åsa Schick", username: "asa.schick" },
          { name: "Felix Oppenheim", username: "felix.oppenheim" },
          { name: "Yvonne Marténg", username: "yvonne" },
        ],
        site: "www.stockholmfisk.se",
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
        week: "Vecka 5",
        artist: "Zlatko Gradholt",
        username: "zlatkogradholt",
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
        artist: "Ivy Dorisse",
        username: "ivy.dorisse",
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
            <a style={{color: "#c67777"}} href="https://www.stockholmfisk.se/">Stockholm Fisk, </a> 
            <a style={{color: "#c67777"}} href="https://psmatsal.com/new-startpage/">PS Matsal, </a>
            <a style={{color: "#c67777"}} href="https://artbakery.se/">Art Bakery, </a>
            <a style={{color: "#c67777"}} href="https://www.nk.se/avdelningar/stockholm/art-cafe?ssw=1">NK CAFE, </a>
            <a style={{color: "#c67777"}} href="https://angbatsbryggan.com/">ÅNGBÅTSBRYGGAN, </a>
            <a style={{color: "#c67777"}} href="https://www.lapiazzadjursholm.se/">LA PIAZZA</a>
            </Typography>

            
          
            <Typography variant="h4" className={s.welcomeText}>
              {t("exhibitQuestion")} {""}
              <a href="mailto: hello@artportable.com">{t("email")}</a>
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

        <div className={s.divider} />
        <Typography
          variant="h4"
          style={{ marginBottom: "40px" }}
          align="center"
        >
          {t("title")}
        </Typography>
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
              <Grid container spacing={4}>
                {showrooms[month].map((showroom, i) => {
                  return (
                    <Grid item xs={12} sm={4} key={i}>
                      <Card
                        className={s.card}
                        style={{ backgroundColor: "#faf3ee" }}
                      >
                        <CardContent style={{ padding: "20px" }}>
                          <Typography
                            variant="h6"
                            style={{ marginBottom: "15px" }}
                          >
                            {showroom.week}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ fontStyle: "italic", marginTop: "10px" }}
                          >
                            <a
                              href={`https://artportable.com/profile/@${showroom.username}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "underline",
                                color: "#a35d5d",
                                cursor: "pointer",
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.color = "#ff8383")
                              }
                              onMouseOut={(e) =>
                                (e.target.style.color = "#a35d5d")
                              }
                            >
                              {showroom.artist}
                            </a>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </TabPanel>
          ))}
        </TabContext>
        <div className={s.divider} />
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
                    <CardHeader
                      title={
                        <a
                          href={`https://${exhibition.site}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "underline",
                            color: "#a35d5d",
                            cursor: "pointer",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.color = "#ff8383")
                          }
                          onMouseOut={(e) => (e.target.style.color = "#a35d5d")}
                        >
                          {selectedCafe.replace("_", " ")}
                        </a>
                      }
                    />
                    <CardContent style={{ padding: "20px" }}>
                      <Typography
                        variant="h6"
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        {exhibition.period}
                      </Typography>
                      {exhibition.artists.map((artist, j) => (
                        <Typography
                          variant="body1"
                          key={j}
                          style={{ fontStyle: "italic", marginTop: "10px" }}
                        >
                          <a
                            href={`https://artportable.com/profile/@${artist.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              color: "#a35d5d",
                              cursor: "pointer",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.color = "#ff8383")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.color = "#a35d5d")
                            }
                          >
                            {artist.name}
                          </a>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabContext>

        <div className={s.divider} />
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
