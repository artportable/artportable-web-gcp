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
import DiscoverArtistCardArticle from "../../../app/components/DiscoverArtistCard/DiscoverArtistCardArticle";
import { useEffect } from "react";
import { marked } from "marked";


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
    console.log('ArticlePage Debug:', {
      article: article,
      coverImage: article?.coverImage,
      coverImageFormats: article?.coverImage?.formats,
      coverImageUrl: article?.coverImage?.url,
      coverImageMediumUrl: article?.coverImage?.formats?.medium?.url,
      hasPublishedAt: !!article?.published_at,
      publishedAt: article?.published_at,
      isFallback: router.isFallback,
      routerReady: router.isReady,
      params: router.query
    });
  }, [article, router]);

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
            {/* Cover image as banner */}
            {article?.coverImage && (
              <img
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  marginBottom: '20px',
                  borderRadius: '8px 8px 0 0'
                }}
                src={
                  article.coverImage.formats?.medium?.url || 
                  article.coverImage.formats?.small?.url || 
                  article.coverImage.url ||
                  (typeof article.coverImage === 'string' ? article.coverImage : '')
                }
                alt="Cover image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.log('Image failed to load:', target.src);
                  console.log('Available coverImage data:', article.coverImage);
                }}
              />
            )}
            
            <div className={s.headingDiv}>
              <Typography variant={"h1"}>{article.title}</Typography>
              {article?.categories && article.categories.length > 0 && (
                <Typography  style={{ marginBottom: '0px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {article.categories[0].name}
                </Typography>
              )}
              {article?.authors && article.authors.length > 0 && (
                <Typography  style={{ marginBottom: '0px', fontStyle: 'italic' }}>
                  By {article.authors.map(author => author.name).join(', ')}
                </Typography>
              )}
              <Typography>{article.published_at?.slice(0, -14)}</Typography>
            </div>
            <div className={s.line}></div>

            <div
              dangerouslySetInnerHTML={{ 
                __html: marked(article.content || '', {
                  renderer: (() => {
                    const renderer = new marked.Renderer();
                    renderer.image = function({ href, title, text }) {
                      // Log the image details for debugging
                      console.log('Processing image:', { href, title, text });
                      
                      // Check if it's a GCS signed URL that might be expired
                      if (href && href.includes('storage.googleapis.com') && href.includes('X-Goog-Signature')) {
                        console.log('Found GCS signed URL, might be expired:', href);
                        // You might want to handle this differently, for now just show the image
                      }
                      
                      return `<img src="${href}" alt="${text}" title="${title || ''}" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;" />`;
                    };
                    return renderer;
                  })()
                })
              }}
              className={s.articleImages}
              style={{ maxWidth: '800px', margin: '0 auto' }}
            />


            <div className={s.line} style={{ margin: '60px' }}></div>
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
    </Main>
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
