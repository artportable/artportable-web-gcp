import { useTranslation } from "next-i18next";
import { styles } from "./showroom.css";
import { useRouter } from "next/router";
import { Tabs, Tab, CardHeader } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

export default function Showroom() {
  const s = styles();
  const { t } = useTranslation("exhibitions");

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const { locale } = useRouter();
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
        username: "marion",
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
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [currentMonthData, setCurrentMonthData] = useState([]);
  const monthNames = Object.keys(showrooms);
  const januaryIndex = monthNames.indexOf("FEBRUARI");

  const [value, setValue] = useState(januaryIndex !== -1 ? januaryIndex : 0);

  const currentDate = new Date();
  const currentMonth = currentDate
    .toLocaleString(locale, { month: "long" })
    .toUpperCase();

  const currentMonthIndex = monthNames.indexOf(currentMonth);

  const handleChange = (event, newValue) => {
    setValue(parseInt(newValue, 10));
  };

  const tabsRef = useRef(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      const selectedMonth = monthNames[value];
      const imagePromises = [];
      const profilePicturePromise = [];

      if (showrooms[selectedMonth]) {
        const monthData = showrooms[selectedMonth];

        for (const showroom of monthData) {
          try {
            const response = await fetch(
              `https://api.artportable.com/api/Artworks/random?owner=${showroom.username}`
            );

            if (!response.ok) {
              console.error(`Failed to fetch data for ${showroom.username}`);
              imagePromises.push("/images/artportableCommercial.jpg");
              continue;
            }

            const data = await response.json();

            if (!data.PrimaryFile) {
              console.error(`No PrimaryFile found for ${showroom.username}`);
              continue;
            }

            const imageUrl = `https://artportableprod-azurecdn.azureedge.net/artportable-prod/images/${data.PrimaryFile.Name}`;

            // Push the image URL for the current showroom
            imagePromises.push(imageUrl);
          } catch (error) {
            console.error(
              `Error fetching data for ${showroom.username}: ${error}`
            );
          }
        }

        setCurrentMonthData(monthData);
      }

      const images = await Promise.all(imagePromises);
      setBackgroundImages(images);
    };

    fetchData();
  }, [value]);

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
      {
        period: "17 JULI - 17 OKTOBER",
        artists: [
          { name: "Karl-Erik Svensson", username: "karl-erik.svensson" },
          { name: "Harriet Haake", username: "haakeart" },
        ],
        site: "www.melanders.se/restauranger/melanders-sodermalm/",
      },
      {
        period: "17 OKTOBER - 17 JANUARI",
        artists: [{ name: "Anette Brekke", username: "anetteb_art" }],
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
        period: "10 DECEMBER - 12 MARS",
        artists: [
          { name: "Sara Bergman", username: "s_bergman1" },
          { name: "Ola Lanteli", username: "ola" },
        ],
        site: "www.artbakery.se/",
      },
      {
        period: "12 MARS - 12 JUNI",
        artists: [
          { name: "ManiPopArt", username: "manipopart" },
          { name: "Annica Hallman", username: "annica.b" },
        ],
        site: "www.artbakery.se/",
      },
      {
        period: "12 MARS - 12 JUNI",
        artists: [
          { name: "ManiPopArt", username: "manipopart" },
          { name: "Annica Hallman", username: "annica.b" },
        ],
        site: "www.artbakery.se/",
      },
      {
        period: "14 JUNI - 14 SEPTEMBER",
        artists: [
          { name: "Anna Ygdevik Burma", username: "annaburma" },
          { name: "Kajsa Bergström", username: "kajsaheer" },
        ],
        site: "www.artbakery.se/",
      },
      {
        period: "14 SEPTEMBER - 14 DECEMBER",
        artists: [
          { name: "Cecilia Hällström", username: "cecilia.hallstrom" },
          { name: "Linda Brodin", username: "mab2001" },
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
    SJÖPAVILJONGEN: [
      {
        period: "29 NOVEMBER - 29 FEBRUARI",
        artists: [{ name: "Anette Brekke", username: "anetteb_art" }],
        site: "www.sjopaviljongen.se/",
      },
      {
        period: "29 FEBRUARI - 29 MAJ",
        artists: [{ name: "Kirsten Johansson", username: "kjdesign" }],
        site: "www.sjopaviljongen.se/",
      },
    ],
  };

  const [selectedCafe, setSelectedCafe] = useState(Object.keys(cafes)[0]);

  const [profilePictureIds, setProfilePictureIds] = useState({});

  useEffect(() => {
    const fetchProfilePictureIds = async () => {
      const ids = {};
      const selectedCafeData = cafes[selectedCafe]; // Fetch data only for the selected cafe

      if (selectedCafeData) {
        for (const exhibition of selectedCafeData) {
          for (const artist of exhibition.artists) {
            try {
              const response = await fetch(
                `https://api.artportable.com/api/Profile/${artist.username}/profilepicture`
              );
              const data = await response.text(); // Use text() instead of json()

              // Check if the response is not empty before updating the state
              if (data) {
                ids[artist.username] = data;
              } else {
                console.error(`Empty response for ${artist.username}`);
              }
            } catch (error) {
              console.error(
                `Error fetching profile picture for ${artist.username}:`,
                error
              );
            }
          }
        }
      }

      setProfilePictureIds(ids);
    };

    fetchProfilePictureIds();
  }, [selectedCafe]);

  return (
    <>
      <div>
        <div className={s.flexContainer}>
          <div className={s.textContainer}>
            <Typography className={s.title}>{t("title")}</Typography>
            <p className={s.description}>
              {t("exhibitionText")}
              <a href="https://melanders.se/restauranger/melanders-sodermalm/">
                Melanders,{" "}
              </a>
              <a href="https://psmatsal.com/new-startpage/">PS Matsal, </a>
              <a href="https://artbakery.se/">Art Bakery, </a>
              <a href="https://www.nk.se/avdelningar/stockholm/art-cafe?ssw=1">
                NK CAFE,{" "}
              </a>
              <a href="https://angbatsbryggan.com/">ÅNGBÅTSBRYGGAN, </a>
              <a href="https://www.lapiazzadjursholm.se/">LA PIAZZA</a>
            </p>

            <p className={s.welcomeText}>
              {t("exhibitQuestion")} {""}
              <a href="mailto: hello@artportable.com">{t("email")}</a>
            </p>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <h2>ARTPORTABLE SHOWROOM</h2>
        </div>
        <div className={s.fullContainer}>
          <TabContext value={String(value)}>
            <div
              style={{
                textAlign: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Tabs
                ref={tabsRef}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "rgb(0 0 0)",
                  },
                }}
              >
                {monthNames.map((month, index) => (
                  <Tab label={month} key={index} />
                ))}
              </Tabs>
            </div>
            <div style={{ alignContent: "center" }}>
              {Object.keys(showrooms).map((month, index) => (
                <TabPanel value={String(index)} key={index}>
                  <Grid container spacing={10}>
                    {showrooms[month].map((showroom, i) => (
                      <Grid item xs={6} sm={6} key={i}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
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
                            <Card
                              className={s.card}
                              style={{
                                backgroundImage: `url('${backgroundImages[i]}')`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",

                                padding: "20px",
                              }}
                            />
                          </a>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              margin: "10px",
                            }}
                          >
                            <div>
                              <Typography className={s.artist}>
                                <a
                                  href={`https://artportable.com/profile/@${showroom.username}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  {showroom.artist.toUpperCase()}
                                </a>
                              </Typography>
                            </div>
                            <div>
                              <Typography>
                                {showroom?.week?.toUpperCase()}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              ))}
            </div>
          </TabContext>

          {/* Cafe Tabs */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TabContext value={selectedCafe}>
              <div>
                <Tabs
                  value={selectedCafe}
                  onChange={(event, newCafe) => setSelectedCafe(newCafe)}
                  variant="scrollable"
                  scrollButtons="on"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "rgb(0 0 0)",
                    },
                  }}
                >
                  {Object.keys(cafes).map((cafe) => (
                    <Tab
                      label={cafe
                        .split("_")
                        .map(
                          (word) => word.charAt(0) + word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                      value={cafe}
                      key={cafe}
                    />
                  ))}
                </Tabs>

                <div className={s.dateArtist}>
                  {selectedCafe &&
                    cafes[selectedCafe] &&
                    cafes[selectedCafe].map((exhibition, i) => (
                      <div key={i}>
                        <div style={{ marginTop: "40px", fontSize: "24px" }}>
                          {exhibition?.period}
                        </div>
                        <div className={s.exhibitionsWrapper}>
                          {exhibition.artists.map((artist, j) => (
                            <div key={j} className={s.dateArtist}>
                              <a
                                href={`https://artportable.com/profile/@${artist.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <div className={s.imgAndName}>
                                  <div>
                                    <img
                                      src={`https://artportableprod-azurecdn.azureedge.net/artportable-prod/images/${
                                        profilePictureIds[artist.username] ||
                                        "7f97243b-4c74-4b95-a720-ae66574f4270.jpg"
                                      }`}
                                      alt="profile picture"
                                      className={s.img}
                                    />
                                  </div>
                                  <div className={s.artistTwo}>
                                    {artist.name}
                                  </div>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabContext>
          </div>
        </div>
      </div>
    </>
  );
}
