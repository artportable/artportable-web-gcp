import { useTranslation } from "next-i18next";
import { styles } from "./showroom.css";
import { useRouter } from "next/router";
import { Tabs, Tab, CardHeader, Link } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { useGetUserExhibitions } from "../../hooks/dataFetching/Stories";
import Button from "@mui/material/Button";
import { Story } from "../../models/Story";
import { cafes, showrooms } from "./showroomData";

export default function Showroom() {
  const s = styles();
  const { t } = useTranslation("exhibitions");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const [page, setPage] = useState(1);

  const [allStories, setAllStories] = useState<Story[]>([]);
  const storiesPerPage = 6;
  const storiesData = useGetUserExhibitions(page, storiesPerPage);
  const currentStories: Story[] = storiesData.data || [];
  const isButtonDisabled = currentStories.length < storiesPerPage;
  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (currentStories.length > 0) {
      setAllStories([...allStories, ...currentStories]);
    }
  }, [currentStories, page]);

  const [backgroundImages, setBackgroundImages] = useState([]);
  const monthNames = Object.keys(showrooms);
  const januaryIndex = monthNames.indexOf("APRIL");

  const [value, setValue] = useState(januaryIndex !== -1 ? januaryIndex : 0);

  const handleChange = (event, newValue) => {
    setValue(parseInt(newValue, 10));
  };

  const tabsRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const selectedMonth = monthNames[value];
      const imagePromises = [];

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
      }

      const images = await Promise.all(imagePromises);
      setBackgroundImages(images);
    };

    fetchData();
  }, [value]);

  const [selectedCafe, setSelectedCafe] = useState(Object.keys(cafes)[0]);

  return (
    <>
      <div>
        <div className={s.bannerContainer}>
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
        </div>

        <div className={s.cafeWrapper}>
          <TabContext value={selectedCafe}>
            <div className={s.tabContainer}>
              <Tabs
                value={selectedCafe}
                onChange={(event, newCafe) => setSelectedCafe(newCafe)}
                variant="scrollable"
                scrollButtons="on"
                className={s.tabs}
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

              <div className={s.exhibitionContainer}>
                {selectedCafe &&
                  cafes[selectedCafe] &&
                  cafes[selectedCafe].map((exhibition, i) => (
                    <div key={i} className={s.exhibitionItem}>
                      <div className={s.periodArtist}>
                        <div className={s.period}>{exhibition?.period}</div>
                        <div>
                          {exhibition.artists.map((artist, j) => (
                            <div key={j} className={s.dateArtist}>
                              <a
                                href={`https://artportable.com/profile/@${artist.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <div className={s.artistTwo}>{artist.name}</div>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabContext>
        </div>

        <div>
          <div className={s.news}>{t("news")}</div>
          <div className={s.exhibitionsWrapperDiv}>
            {allStories?.map((exhibition) => (
              <div key={exhibition.Id} className={s.newsCard}>
                <a
                  href={`/stories/${exhibition?.Slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <img
                      src={`${bucketUrl}${exhibition?.PrimaryFile?.Name}`}
                      alt="exhibition Image"
                      className={s.img}
                    />
                  </div>
                  <div>
                    <div className={s.titleUserExhibition}>
                      {exhibition?.Title}
                    </div>
                    <div>
                      {exhibition?.Description &&
                        exhibition.Description.slice(0, 150)}
                      {"..."}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {!isButtonDisabled && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button
                color="primary"
                aria-label="load more"
                variant="contained"
                onClick={loadMore}
              >
                {t("loadMore")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
