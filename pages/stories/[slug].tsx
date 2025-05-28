import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../app/components/Main/Main";
import {
  useGetStory,
  useGetStoryBySlug,
} from "../../app/hooks/dataFetching/Stories";
import { Avatar, IconButton } from "@material-ui/core";
import { styles } from "../../styles/story.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "../../app/components/Button/Button";
import { LoadingContext } from "../../app/contexts/loading-context";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import { UserContext } from "../../app/contexts/user-context";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../app/utils/googleAnalytics";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import { Story } from "../../app/models/Story";
import EditStoryDialog from "../../app/components/EditStoryDialog/EditStoryDialog";
import Carousel from "react-material-ui-carousel";
import { RWebShare } from "react-web-share";
import { SiteError } from "getstream";
import { insertLinks } from "../../app/utils/textUtils";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

interface StoryProps {
  navBarItems: any;
  story: Story;
  locale: any;
}

export default function StoryPage(props: StoryProps) {
  const s = styles();
  const { t } = useTranslation(["story", "common"]);
  const router = useRouter();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const staticStory: Story = props?.story;
  const navBarItems = props?.navBarItems;
  const canonicalURL = publicUrl + router.asPath;

  const { slug } = router.query;
  const { username, socialId } = useContext(UserContext);
  const storyData = useGetStoryBySlug(slug as string, username.value);
  const story: Story = storyData?.data;
  const date: Date = new Date(story?.Published);
  const images: (string | undefined)[] = [
    story?.PrimaryFile?.Name,
    story?.SecondaryFile?.Name,
    story?.TertiaryFile?.Name,
  ];
  const filteredImages: string[] = images.filter(
    (image) => image !== undefined
  ) as string[];

  //const profileUser = useGetProfileUser();
  //const token = useContext(TokenContext)

  const [editStoryOpen, setEditStoryOpen] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  const myUsername = username?.value;
  const storyUsername = story?.Username;
  const isMyStory = storyUsername?.toLowerCase() === myUsername?.toLowerCase();

  const openEditStoryDialog = () => {
    setEditStoryOpen(true);
  };

  const onEditStoryClose = async (promise) => {
    if (promise) {
      try {
        setEditStoryOpen(false);
        setLoading(true);
        await promise;
        setLoading(false);
      } catch (error) {
        // Error handling - removed console.log
      }
      //storyData.mutate();
    } else {
      setEditStoryOpen(false);
    }
  };

  function renderWithLineBreaks(text) {
    return text.split("\n").map((str, index, array) => (
      <>
        {str}
        {index === array.length - 1 ? null : <br />}
      </>
    ));
  }

  const storyUrl = `https://artportable.com/story/${storyData?.data?.slug}`;
  const shareStoryTitle = storyData?.data?.Title
    ? `${t("common:share")}"${storyData?.data?.Title}"`
    : `${t("common:share")}`;
  const shareStoryText = `${t("common:checkThisArtwork")}"${
    storyData?.data?.Title
  }"${t("common:atArtportable")}`;

  return (
    <Main wide navBarItems={navBarItems}>
      <Head>
        <title>{staticStory?.Title ?? "Artportable"}</title>
  
        <meta property="og:description" content={staticStory?.Title ?? ""} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${publicUrl}/story/${staticStory?.Id}`}
        />
        <meta
          property="og:image"
          content={`${bucketUrl}${staticStory?.PrimaryFile?.Name}`}
        />

        <link
          rel="canonical"
          href={`${publicUrl}/${props.locale}${router.asPath}`}
        />
      </Head>
      {storyData.isLoading && <div>loading...</div>}
      {storyData.isError && <div>error...</div>}

      {storyData && storyData.data && (
        <>
          <article className={s.story}>
            {story?.SecondaryFile ? (
              <Carousel navButtonsAlwaysVisible autoPlay={false}>
                {filteredImages.map((image, i) => {
                  return (
                    <img
                      key={i}
                      className={s.image}
                      src={`${bucketUrl}${image}`}
                      alt={`${story.Title ? story.Title : "story image"}`}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <img
                className={s.image}
                src={`${bucketUrl}${story.PrimaryFile.Name}`}
                alt={`${story.Title ? story.Title : "story image"}`}
              />
            )}
            <div className={s.publishShare}>
              <time dateTime={date.toISOString()} className={s.published}>
                {t("published")} {date.toLocaleDateString()}
              </time>
              <RWebShare
                sites={["facebook", "linkedin", "copy", "mail"]}
                data={{
                  text: shareStoryText,
                  url: storyUrl,
                  title: shareStoryTitle,
                }}
              >
                <Button
                  className={s.shareButton}
                  endIcon={<ShareSharpIcon />}
                  variant="contained"
                  rounded
                  color=""
                >
                  {t("common:share")}
                </Button>
              </RWebShare>
            </div>
            <h1 className={s.title}>{story.Title}</h1>
            <p
              className={s.text}
              dangerouslySetInnerHTML={{
                __html: `${insertLinks(story.Description)}`,
              }}
            ></p>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
            {isMyStory && (
              <>
                <div className={s.btnContainer}>
                  <Button
                    aria-label="edit"
                    className={s.editButton}
                    variant="contained"
                    rounded
                    onClick={() => openEditStoryDialog()}
                  >
                    {t("editStory")}
                  </Button>
                </div>
                <EditStoryDialog
                  story={story}
                  open={editStoryOpen}
                  onClose={onEditStoryClose}
                />
              </>
            )}

            <div className={s.btnContainer} style={{ marginTop: "20px" }}>
              {isMyStory && story.Exhibition && (
                <>
                  {story?.IsBoosted === false ? (
                    <Button
                      aria-label="boost"
                      onClick={() => {
                        router.push(`/checkoutstory?${story.Id}`);
                      }}
                      startIcon={<RocketLaunchIcon />}
                    >
                      {t("promoteArtwork")}
                    </Button>
                  ) : (
                    <Button
                      aria-label="boost"
                      disabled
                      startIcon={<RocketLaunchIcon />}
                    >
                      {t("promotedArtwork")}
                    </Button>
                  )}
                </>
              )}
            </div>
            <div className={s.writerContainer}>
              {story?.ProfilePicture ? (
                <Link href={`/profile/@${story.Username}`}>
                  <a>
                    <Avatar
                      src={`${bucketUrl}${story?.ProfilePicture}`}
                      alt="Profile picture"
                      style={{ height: "120px", width: "120px" }}
                      className={s.image}
                    />
                  </a>
                </Link>
              ) : (
                <Link href={`/profile/@${story.Username}`}>
                  <a>
                    <AccountCircleIcon
                      color="secondary"
                      style={{ fontSize: 48 }}
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
          </article>
        </>
      )}
    </Main>
  );
}

export async function getServerSideProps({ locale, params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Check if params and params.slug are defined
  const url =
    params && params.slug
      ? new URL(
          `${apiBaseUrl}/api/stories/story/${encodeURIComponent(params.slug)}`
        )
      : null;

  if (!url) {
    // Handle the case when params.slug is undefined
    console.error("Missing or undefined slug parameter.");
    return {
      notFound: true,
    };
  }

  const navBarItems = await getNavBarItems();

  try {
    const storyResponse = await fetch(url.href, {
      // timeout: 11000
      // fail return prop som sätts till true
    });
    const story = await storyResponse.json();

    return {
      props: {
        // fetch timeout
        navBarItems: navBarItems,
        story,
        locale: locale,
        ...(await serverSideTranslations(locale, [
          "header",
          "footer",
          "common",
          "support",
          "plans",
          "story",
        ])),
      },
    };
  } catch (error) {
    console.error("Error fetching story:", error);
  }

  return {
    props: {
      // fetch timeout
      navBarItems: navBarItems,
      story: { Slug: params.slug }, // This assumes you have a Slug property in your Story model
      locale: locale,
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "common",
        "support",
        "plans",
        "story",
      ])),
    },
  };
}
