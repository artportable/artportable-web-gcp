import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../../app/components/Main/Main";
import { Article } from "../../../app/models/Article";
import { Category } from "../../../app/models/Category";
import { Avatar, Typography, Paper, Divider } from "@material-ui/core";
import { styles } from "../../../styles/[articleSlug].css";
import Button from "../../../app/components/Button/Button";
import Link from "next/link";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { fetchWithTimeout } from "../../../app/utils/util";
import DiscoverArtistCardArticle from "../../../app/components/DiscoverArtistCard/DiscoverArtistCardArticle";
import { useEffect } from "react";
import { marked } from "marked";
import MainOption from "../../../app/components/Main/MainOption";
import { useMediaQuery, useTheme } from "@mui/material";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MainOption      
    noHeaderPadding={isMobile ? true : false}
    wide={false}
    isShow={true}
    fullWidth={true}>
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
        <div>
          <h1>Loading article...</h1>
          <p>Path: {router.asPath}</p>
          <p>This article is being generated...</p>
        </div>
      )}
      {!router.isFallback && (
        <>
          {!!!article.published_at && ( //No publish date means article is in draft
            <Typography color={"primary"} variant={"h1"}>
              Preview Mode
            </Typography>
          )}

          <div className={s.paper}>
            {/* Cover image */}
            {article?.coverImage && (
              <img
                className={s.coverImage}
                src={
                  article.coverImage.formats?.medium?.url || 
                  article.coverImage.formats?.small?.url || 
                  article.coverImage.url ||
                  (typeof article.coverImage === 'string' ? article.coverImage : '')
                }
                alt="Cover image"
              />
            )}
            
            <div className={s.headingDiv}>
           
            <div className={s.metaInfo}>
            {article?.categories && article.categories.length > 0 && (
                <Typography className={s.categoryText}>
                  {article.categories[0].name}
                </Typography>
              )}
                {article?.authors && article.authors.length > 0 && (
                  <Typography className={s.authorText}>
                    By {article.authors.map(author => author.name).join(', ')}
                  </Typography>
                )}
                
                <Typography className={s.dateText}>
                  {new Date(article.published_at).toLocaleDateString('sv-se', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </div>
            </div>

            <div className={s.articleContent}>
            <Typography className={s.articleTitle}>
                {article.title}
              </Typography>
              <div
                dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    const htmlContent = marked(article.content || '', {
                      renderer: (() => {
                        const renderer = new marked.Renderer();
                        renderer.image = function({ href, title, text }) {
                          return `<img src="${href}" alt="${text}" title="${title || ''}" style="width: 100%; height: auto; margin: 0; border-radius: 4px; display: block;" class="article-image" />`;
                        };
                        return renderer;
                      })()
                    }) as string;
                    
                    // Post-process to wrap consecutive images in a flex container
                    return htmlContent.replace(
                      /(<p><img[^>]*><\/p>\s*<p><a[^>]*>[^<]*<\/a><\/p>\s*)+/g,
                      (match) => {
                        // Extract image+link pairs
                        const pairs = match.match(/<p><img[^>]*><\/p>\s*<p><a[^>]*>[^<]*<\/a><\/p>/g) || [];
                        if (pairs.length > 1) {
                          const imageColumns = pairs.map(pair => {
                            return `<div class="image-column">${pair}</div>`;
                          }).join('');
                          return `<div class="image-row">${imageColumns}</div>`;
                        }
                        return match;
                      }
                    );
                  })()
                }}
                className={s.articleImages}
              />
            </div>

            <div className={s.line}></div>
            
            {artist && artist.length > 0 && (
              <div>
                {artist.map((a) => {
                  return (
                    <DiscoverArtistCardArticle
                      key={a.SocialId || a.Username}
                      artist={a}
                    />
                  );
                })}
              </div>
            )}
          </div>
     
        </>
      )}
    </MainOption>
  );
}

// ... (other imports)

export async function getStaticProps(context) {
  const { locale, params, preview } = context;
  
  // First try to get the article by slug with category filter
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[slug][$eq]=${params.articleSlug}&filters[categories][slug][$eq]=${params.slug}&locale=${locale}&populate[0]=coverImage&populate[1]=authors&populate[2]=authors.picture&populate[3]=categories&populate[4]=publishCategory${preview ? "&publicationState=preview" : ""}`,
    {
      // timeout: 11000
    }
  );

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const response = await res.json();
  let article = response.data[0];

  if (!article) {
    return {
      notFound: true,
    };
  }

  // Convert v4 format to expected format
  const articleData = {
    id: article.id,
    ...article.attributes,
    // Map publishedAt to published_at for compatibility
    published_at: article.attributes.publishedAt,
    // Handle relations with null checks
    coverImage: article.attributes.coverImage?.data?.attributes || null,
    authors: article.attributes.authors?.data?.map(author => ({
      id: author.id,
      ...author.attributes,
      picture: author.attributes.picture?.data?.attributes || null
    })) || [],
    categories: article.attributes.categories?.data?.map(cat => ({
      id: cat.id,
      ...cat.attributes
    })) || [],
    publishCategory: article.attributes.publishCategory?.data ? {
      id: article.attributes.publishCategory.data.id,
      ...article.attributes.publishCategory.data.attributes
    } : null
  };

  var artist = null;
  if (articleData.artist) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Discover/artists/top`
    );
    url.searchParams.append("q", articleData.artist);
    var artistResult = await fetch(url.href);
    if (artistResult && artistResult.status === 200) {
      artist = await artistResult.json();
    }
  }

  return {
    props: {
      artist: artist,
      article: articleData,
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?locale=all&populate[0]=categories&populate[1]=publishCategory`
    );
    
    if (!res.ok) {
      return { paths: [], fallback: true };
    }

    const response = await res.json();
    const articles = response.data;

    const paths = articles
      .filter((article) => {
        const publishCategory = article.attributes.publishCategory?.data?.attributes;
        return (
          typeof publishCategory?.slug === "string" &&
          typeof article.attributes.slug === "string"
        );
      })
      .map((article) => ({
        params: {
          slug: article.attributes.publishCategory.data.attributes.slug,
          articleSlug: article.attributes.slug,
        },
        locale: article.attributes.locale,
      }));

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: true };
  }
}
