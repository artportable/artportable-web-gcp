import React, { useContext, useEffect, useState } from "react";
import { styles } from "./discoverStoriesTab.css";
import { useTranslation } from "next-i18next";
import { Story } from "../../models/Story";
import { useGetLatestStories } from "../../hooks/dataFetching/Stories";
import Button from "../Button/Button";
import DiscoverStories from "../DiscoverStories/DiscoverStories";
import Link from "next/link";
import { UserContext } from "../../contexts/user-context";
import { Membership } from "../../models/Membership";

export default function DiscoverStoriesTab() {
  const s = styles();
  const { t } = useTranslation("discover");

  const [page, setPage] = useState(1);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const storiesPerPage = 12;
  const storiesData = useGetLatestStories(page);
  const currentStories: Story[] = storiesData.data || [];

  useEffect(() => {
    if (currentStories.length > 0) {
      setAllStories([...allStories, ...currentStories]);
    }
  }, [currentStories]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const { membership } = useContext(UserContext);

  const isButtonDisabled = currentStories.length < storiesPerPage;

  return (
    <>
      {membership.value >= Membership.PortfolioPremium && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "3em",
          }}
        >
          <Link href="/upload-story">
            <a>
              <Button
                aria-label="upload story"
                variant="contained"
                rounded
                className={s.uploadButton}
              >
                {t("discover:uploadStory")}
              </Button>
            </a>
          </Link>
        </div>
      )}
      <DiscoverStories stories={allStories} />
      {!isButtonDisabled && (
        <div className={s.btnContainer}>
          <Button className={s.btn} aria-label="load more" onClick={loadMore}>
            {t("discover:loadMore")}
          </Button>
        </div>
      )}
    </>
  );
}
