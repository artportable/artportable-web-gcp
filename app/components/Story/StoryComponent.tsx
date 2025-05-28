import Link from "next/link";
import { styles } from "./storyComponent.css";
import { Story } from "../../models/Story";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar } from "@material-ui/core";
import Button from "../Button/Button";

import { useTranslation } from "next-i18next";

interface StoryComponentProps {
  story: Story;
  isIndex: boolean;
  showDescription?: boolean;
}

export default function StoryComponent({
  story,
  isIndex,
  showDescription = true,
}: StoryComponentProps) {
  const { t } = useTranslation(["common"]);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const s = styles();
  const date: Date = new Date(story?.Published);
  const month: string = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(date);
  const day: string = date.toLocaleString("default", { day: "numeric" });

  return (
    <article className={s.story}>
      {isIndex && (
        <div className={s.writerContainer}>
          {story?.ProfilePicture ? (
            <Link href={`/profile/@${story.Username}`}>
              <a>
                <Avatar
                  src={`${bucketUrl}${story?.ProfilePicture}`}
                  alt="Profile picture"
                  className={s.avatar}
                />
              </a>
            </Link>
          ) : (
            <Link href={`/profile/@${story.Username}`}>
              <a>
                <AccountCircleIcon
                  color="secondary"
                  style={{ fontSize: 30, marginRight: "10px" }}
                />
              </a>
            </Link>
          )}
          <Link href={`/profile/@${story.Username}`}>
            <a>
              <h2>
                {story.Name} {story.Surname}
              </h2>
            </a>
          </Link>
        </div>
      )}

      <Link
        href={
          story?.Slug != null ? `/stories/${story.Slug}` : `/story/${story.Id}`
        }
      >
        <a>
          <div className={s.imageContainer}>
            <img
              className={s.image}
              alt={`${story?.Title ? story?.Title : "story image"}`}
              src={`${bucketUrl}${story?.PrimaryFile?.Name}`}
            />
          </div>
          <div className={s.textTitle}>
            <header>
              <time dateTime={date.toISOString()} className={s.datePublished}>
                <div className={s.monthDay}>
                  <span className={s.month}>{month}</span>
                  <span className={s.day}>{day}</span>
                </div>
              </time>
              <h2 className={s.title}>{story?.Title}</h2>
            </header>
            {showDescription && (
              <>
            {story.Description.length > 200 ? (
              <p className={s.text}>
                {story?.Description.slice(0, 200).trimEnd()}...{" "}
                <i>{t("common:readMore")}</i>
              </p>
            ) : (
              <p className={s.text}>{story?.Description}</p>
                )}
              </>
            )}
          </div>
        </a>
      </Link>
    </article>
  );
}
