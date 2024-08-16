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
import { cafes } from "./showroomData";
import juliImage from "../../../public/images/juli1.png";

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

  const [selectedCafe, setSelectedCafe] = useState(Object.keys(cafes)[0]);

  return (
    <>
      <div>
        <div className={s.bannerContainer} style={{ marginBottom: "20px" }}>
          <div className={s.textContainer}>
            <Typography className={s.title}>{t("title")}</Typography>

            <p className={s.welcomeText}>
              {t("exhibitQuestion")} {""}
              <a href="mailto: hello@artportable.com">{t("email")}</a>
            </p>
          </div>
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
