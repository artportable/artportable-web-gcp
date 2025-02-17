import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../../app/components/Main/Main";
import { Article } from "../../../app/models/Article";
import { Category } from "../../../app/models/Category";
import { Avatar, Typography, Paper } from "@material-ui/core";
import { styles } from "../../../styles/[articleSlug].css";
import Button from "../../../app/components/Button/Button";
import Link from "next/link";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { fetchWithTimeout } from "../../../app/utils/util";
import DiscoverArtistCard from "../../../app/components/DiscoverArtistCard/DiscoverArtistCard";
import { useEffect } from "react";

export default function ArticlePage({
  article,
  artist,
}: {
  article: Article;
  artist;
}) {
  const router = useRouter();
  const s = styles();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["articles"]);
  const canonicalURL = publicUrl + router.asPath;

  useEffect(() => {
    console.log(encodeURIComponent);
  }, []);

  return (
    <Main>
      <Head>
        <title>{article?.title ?? "Artportable"}</title>
        <meta name="title" content={article?.title ?? "Artportable"} />
        <meta name="description" content={article?.description ?? ""} />
        <meta property="og:title" content={article?.title ?? "Artportable"} />
        <meta property="og:description" content={article?.description ?? ""} />
        <meta property="og:type" content="article" />

        <meta
          property="og:url"
          content={`${publicUrl}/${article?.publishCategory?.slug}/${article?.slug}`}
        />

        <meta
          property="og:image"
          content={article?.coverImage?.formats?.small?.url}
        />
        <meta property="og:datePublished" content={article?.published_at} />
        <meta property="og:dateModified" content={article?.updated_at} />
        {article?.authors?.map((author) => {
          return (
            <>
              <meta property="og:author" content={author.name} />
              <meta name="author" content={author.name} />
            </>
          );
        })}
        <link
          rel="canonical"
          href={`${publicUrl}/${article?.publishCategory?.slug}/${article?.slug}`}
        />
      </Head>
      {router.isFallback && (
        //implement good skeleton here
        <div>Loading...</div>
      )}
      {!router.isFallback && (
        <>
          {!!!article.published_at && ( //No publish date means article is in draft
            <Typography color={"primary"} variant={"h1"}>
              Preview Mode
            </Typography>
          )}
          <img
            className={s.background}
            src={article?.coverImage?.formats?.medium?.url}
            alt="background image"
          />

          <Paper className={s.paper}>
            <div className={s.headingDiv}>
              <Typography variant={"h1"}>{article.title}</Typography>
              <Typography>{article.published_at?.slice(0, -14)}</Typography>
            </div>
            <div className={s.line}></div>

            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className={s.articleImages}
            />

            {article?.authors?.map((author) => {
              return (
                <div className={s.authorDiv} key={author.id}>
                  <Avatar
                    src={author?.picture?.formats?.thumbnail?.url}
                    className={s.authorAvatar}
                  />
                  <Typography className={s.authorText}>
                    {author.name}
                  </Typography>
                  {author.name === "Redaktion" ||
                  author.name === "Editorial" ? null : (
                    <div>
                      <Typography>{t("writer")}</Typography>
                    </div>
                  )}
                </div>
              );
            })}
            <div className={s.line}></div>
            <div className={s.findArt}>
              <Typography>{t("tagLine")}</Typography>
              <Link href={`/`}>
                <a>
                  <img
                    height={20}
                    className={s.artportable_logo}
                    src={"/images/Artportable_Logotyp_Black.jpg"}
                    alt="link to artportable"
                    title="artportable_logo"
                  />
                </a>
              </Link>
            </div>
            <div className={s.tagDiv}>
              {article?.categories?.map((category) => {
                return (
                  <>
                    <Link href={`/${category.slug}`}>
                      <a>
                        <Button
                          rounded
                          variant="outlined"
                          color="primary"
                          disableElevation
                        >
                          <Typography>{category.name}</Typography>
                        </Button>
                      </a>
                    </Link>
                  </>
                );
              })}
            </div>
          </Paper>
          <div className={s.div}>
            {artist && artist.length > 0 && (
              <div className={s.div2}>
                {artist.map((a) => {
                  return (
                    <DiscoverArtistCard
                      artist={a}
                      onFollowClick={null}
                    ></DiscoverArtistCard>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </Main>
  );
}

// ... (other imports)

export async function getStaticProps(context) {
  const { locale, params, preview } = context;
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/slug/${
      params.articleSlug
    }?_locale=${locale}&categories.slug=${params.slug}${
      preview ? "&_publicationState=preview" : ""
    }`,
    {
      // timeout: 11000
    }
  );
  var articles = await res.json();
  var article: Article = articles.find(
    (article: Article) => article.locale == locale
  );

  if (article == null) {
    let categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories/slug/${params.slug}`,
      {
        // timeout: 11000
      }
    );

    if (!categoryRes.ok) {
      return {
        notFound: true,
      };
    }

    var currentCategory = await categoryRes.json();

    let res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/slug/${
        params.articleSlug
      }?categories_in=${currentCategory.id}&categories_in=${
        currentCategory.localizations[0]?.id
      }${preview ? "&_publicationState=preview" : ""}`,
      {
        // timeout: 11000
      }
    );

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    article = await res.json();

    categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?localizations.id=${article.publishCategory.id}&_locale=${locale}`,
      {
        // timeout: 11000
      }
    );

    var newLocaleCategories = await categoryRes.json();
    var newLocaleCategory: Category = newLocaleCategories.find(
      (category: Category) => category.locale == locale
    );

    if (
      newLocaleCategory &&
      newLocaleCategory.id !== currentCategory.id &&
      locale !== article.locale
    ) {
      return {
        redirect: {
          destination: `/${newLocaleCategory.slug}/${article.slug}`,
          permanent: true,
        },
      };
    }

    if (
      locale !== article.locale &&
      article.locale !== locale.sv &&
      article.locale !== locale.en &&
      article.locale !== locale.nb &&
      article.locale !== locale.da &&
      article.locale !== locale.is
    ) {
      var newLocaleArticle = article.localizations.find(
        (articleLocale) => articleLocale.locale === locale
      );

      if (newLocaleArticle) {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/slug/${
            params.articleSlug
          }?_locale=${locale}&categories_in=${newLocaleArticle.id}${
            preview ? "&_publicationState=preview" : ""
          }`,
          {
            // timeout: 11000
          }
        );

        if (res.ok) {
          article = await res.json();
        }
      }
    }
  }

  var artist = null;
  if (article.artist) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Discover/artists/top`
    );
    url.searchParams.append("q", article.artist);
    var artistResult = await fetch(url.href);
    var artist = null;
    if (artistResult && artistResult.status === 200) {
      artist = await artistResult.json();
    }
  }

  return {
    props: {
      artist: artist,
      article: article,
      ...(await serverSideTranslations(locale, [
        "articles",
        "common",
        "header",
        "footer",
        "profile",
        "tags",
        "art",
        "upload",
        "support",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?_locale=all`
    );
    const articles = await res.json();

    const paths = articles
      .filter(
        (article) =>
          typeof article.publishCategory?.slug === "string" &&
          typeof article.slug === "string"
      )
      .map((article) => ({
        params: {
          slug: article.publishCategory.slug,
          articleSlug: article.slug,
        },
        locale: article.locale,
      }));

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: true };
  }
}
