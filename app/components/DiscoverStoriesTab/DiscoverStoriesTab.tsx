import React, { useEffect, useState } from "react";
import { styles } from "./discoverStoriesTab.css";
import { useTranslation } from "next-i18next";
import { Story } from "../../models/Story";
import { useGetLatestStories } from "../../hooks/dataFetching/Stories";
import Button from "../Button/Button";
import DiscoverStories from "../DiscoverStories/DiscoverStories";

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

  const isButtonDisabled = currentStories.length < storiesPerPage;

  return (
    <>
      <DiscoverStories stories={allStories} />
      {!isButtonDisabled && (
        <div className={s.btnContainer}>
          <Button
            className={s.btn}
            color="primary"
            aria-label="load more"
            variant="contained"
            onClick={loadMore}
          >
            {t("discover:loadMore")}
          </Button>
        </div>
      )}
    </>
  );
}
