import { useTranslation } from "next-i18next";
import { styles } from "../../../styles/exhibitions.css";
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
import { useBreakpointDown } from "../../hooks/useBreakpointDown";

export default function Showroom() {
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
        week: "Vecka 5",
        artist: "Anne Hörnell",
        username: "annika.berglof",
      },
      {
        week: "Vecka 6",
        artist: "Anne Persson",
        username: "perssonanne",
      },
      {
        week: "Vecka 7",
        artist: "Maria Andersson",
        username: "maria.andersson",
      },
      {
        week: "Vecka 8",
        artist: "monir sarmi",
        username: "monir.moslemi",
      },
    ],
    MARS: [
      {
        week: "Vecka 9",
        artist: "Ida Widman",
        username: "konstigheter",
      },
      {
        week: "Vecka 10",
        artist: "Stephan nicholas hoerhammer",
        username: "stephannicolaushoerhammer",
      },
      {
        week: "Vecka 11",
        artist: "Birgitta Lindfors",
        username: "birgitta.lindfors",
      },
      {
        week: "Vecka 12",
        artist: "Vera Stubergh",
        username: "vera.stubergh1940",
      },
      {
        week: "Vecka 13",
        artist: "Hans ström",
        username: "hans.strom",
      },
    ],
    APRIL: [
      {
        week: "Vecka 14",
        artist: "Zanna Guldbrandsson",
        username: "zannaguldbrandsson",
      },
      {
        week: "Vecka 15",
        artist: "Lars Dahlström",
        username: "lars.dahlstrom",
      },
      {
        week: "Vecka 16",
        artist: "Erika Holm Petre",
        username: "erikaholmpetre",
      },
      {
        week: "Vecka 17",
        artist: "Göran billingskog",
        username: "gorito",
      },
    ],
    MAJ: [
      {
        week: "Vecka 19",
        artist: "Ebba kristina wikgård",
        username: "ebba_kristina",
      },
      {
        week: "Vecka 20",
        artist: "Ulrika ritter",
        username: "ulrika.ritter",
      },
      {
        week: "Vecka 21",
        artist: "Marina bonnevier",
        username: "mabon",
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
        artist: "Janet Westman",
        username: "janetwestman",
      },
      {
        week: "Vecka 24",
        artist: "Anna-Maria Andersson",
        username: "anna-maria.andersson",
      },
      {
        week: "Vecka 25",
        artist: "Cina Fundin",
        username: "cina.fundin",
      },
      {
        week: "Vecka 26",
        artist: "Mona-Lisa Eriksson",
        username: "gladiator",
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
        artist: "Luidmilla Kerdman",
        username: "lucykerdman",
      },
      {
        week: "Vecka 32",
        artist: "Mona Anita Eriksen",
        username: "mona.anita.eriksen",
      },
      {
        week: "Vecka 33",
        artist: "Sandra Gustavsson",
        username: "sandra.gustavsson",
      },
      {
        week: "Vecka 34",
        artist: "ARTS Beyond ART",
        username: "artsbeyondart",
      },
      {
        week: "Vecka 35",
        artist: "Gunilla Svärd",
        username: "gunilla.svard",
      },
    ],
    SEPTEMBER: [
      {
        week: "Vecka 36",
        artist: "Christina Danielsson",
        username: "christina.danielsson",
      },
      {
        week: "Vecka 37",
        artist: "Henrik Sjöström",
        username: "henrik.sjostrom",
      },
      {
        week: "Vecka 38",
        artist: "Robban Galli",
        username: "",
      },
      {
        week: "Vecka 39",
        artist: "Catharina Lundh",
        username: "sickan64",
      },
    ],
    OKTOBER: [
      {
        week: "Vecka 40",
        artist: "Inger Bernholdsson",
        username: "inger.bernholdsson",
      },
      {
        week: "Vecka 41",
        artist: "Pia Bark",
        username: "piabark",
      },
      {
        week: "Vecka 42",
        artist: "Gina Axlund",
        username: "gina.axlund",
      },
      {
        week: "Vecka 43",
        artist: "Camilla Thelin",
        username: "",
      },
    ],
    NOVEMBER: [
      {
        week: "Vecka 44",
        artist: "Jessica Elert",
        username: "Jessicaelert",
      },
      {
        week: "Vecka 46",
        artist: "Helen Sjöstrand",
        username: "sjostrandhelen",
      },
      {
        week: "Vecka 47",
        artist: "Angelica Diehn",
        username: "angelica.diehn",
      },
    ],
    DECEMBER: [
      {
        week: "Vecka 51 - 54",
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
      <div className={s.fullContainer}>
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

                                cursor: "pointer",
                              }}
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

                            cursor: "pointer",
                          }}
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

                              cursor: "pointer",
                            }}
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
        <div className={s.flexContainer}>
          <div className={s.left}>
            <Typography variant="h1" className={s.headline}>
              {t("artportableExhibition")}
            </Typography>
            <Typography variant="h4" className={s.description}>
              {t("exhibitionText")}
              <a
                style={{ color: "#c67777" }}
                href="https://melanders.se/restauranger/melanders-sodermalm/"
              >
                Melanders,{" "}
              </a>
              <a
                style={{ color: "#c67777" }}
                href="https://psmatsal.com/new-startpage/"
              >
                PS Matsal,{" "}
              </a>
              <a style={{ color: "#c67777" }} href="https://artbakery.se/">
                Art Bakery,{" "}
              </a>
              <a
                style={{ color: "#c67777" }}
                href="https://www.nk.se/avdelningar/stockholm/art-cafe?ssw=1"
              >
                NK CAFE,{" "}
              </a>
              <a
                style={{ color: "#c67777" }}
                href="https://angbatsbryggan.com/"
              >
                ÅNGBÅTSBRYGGAN,{" "}
              </a>
              <a
                style={{ color: "#c67777" }}
                href="https://www.lapiazzadjursholm.se/"
              >
                LA PIAZZA
              </a>
            </Typography>

            <Typography variant="h4" className={s.welcomeText}>
              {t("exhibitQuestion")} {""}
              <a href="mailto: hello@artportable.com">{t("email")}</a>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
