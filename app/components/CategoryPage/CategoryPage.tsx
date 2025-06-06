import { useContext, useEffect } from "react";
import {
  Box,
  Link,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Category } from "../../models/Category";
import Main from "../Main/Main";
import { styles } from "./categoryPage.css";
import MuiButton from "@material-ui/core/Button";
import { NavBarItem } from "../../models/NavBarItem";
import { useState } from "react";
import { UserContext } from "../../contexts/user-context";
import { Membership } from "../../models/Membership";
import Button from "../Button/Button";
import ArticleLead from "../ArticleLead/ArticleLead";
import Divider from "@mui/material/Divider";
import { useGetLatestStories } from "../../hooks/dataFetching/Stories";
import StoryComponent from "../Story/StoryComponent";
import { Grid } from "@material-ui/core";
import BannerText from "../BannerText/BannerText";
import MainOption from "../Main/MainOption";

export default function CategoryPage({
  category,
  navBarItems,
}: {
  category: Category;
  navBarItems: NavBarItem[];
}) {
  const s = styles();
  const router = useRouter();
  const { t } = useTranslation(["articles"]);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const canonicalURL = publicUrl + router.asPath;
  const { isSignedIn, membership, phone } = useContext(UserContext);

  // Fetch latest stories
  const { data: latestStories, isLoading: storiesLoading } = useGetLatestStories(1);
  const displayStories = latestStories?.slice(0, 4) || [];

  // State for all articles from both categories
  const [array, setArray] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  // Fetch articles from both categories
  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        setIsLoadingArticles(true);
        
        // Fetch articles from both categories
        const [artiklarRes, konstnaersportraettRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[categories][slug][$eq]=artiklar&locale=${router.locale}&populate[0]=coverImage&populate[1]=categories&populate[2]=publishCategory`),
          fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[categories][slug][$eq]=konstnaersportraett&locale=${router.locale}&populate[0]=coverImage&populate[1]=categories&populate[2]=publishCategory`)
        ]);

        const [artiklarData, konstnaersportraettData] = await Promise.all([
          artiklarRes.json(),
          konstnaersportraettRes.json()
        ]);

        // Convert Strapi v4 format to expected format
        const convertArticle = (article) => ({
          id: article.id,
          ...article.attributes,
          published_at: article.attributes.publishedAt,
          coverImage: article.attributes.coverImage?.data?.attributes || null,
          categories: article.attributes.categories?.data?.map(cat => ({
            id: cat.id,
            ...cat.attributes
          })) || [],
          publishCategory: article.attributes.publishCategory?.data ? {
            id: article.attributes.publishCategory.data.id,
            ...article.attributes.publishCategory.data.attributes
          } : null
        });

        // Combine and convert articles, removing duplicates by ID
        const allArticles = [
          ...(artiklarData.data || []).map(convertArticle),
          ...(konstnaersportraettData.data || []).map(convertArticle)
        ];

        // Remove duplicates based on article ID
        const uniqueArticles = allArticles.filter((article, index, self) => 
          index === self.findIndex(a => a.id === article.id)
        );

        setArray(uniqueArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArray([]);
      } finally {
        setIsLoadingArticles(false);
      }
    };

    fetchAllArticles();
  }, [router.locale]);
  
  // Safe sorting with null checks
  if (array && array.length > 0) {
    array.sort((x, y) => {
      const dateX = x.published_at ? +new Date(x.published_at) : 0;
      const dateY = y.published_at ? +new Date(y.published_at) : 0;
      return dateX - dateY;
    });
    array.sort((a, b) => {
      if (!a.published_at || !b.published_at) return 0;
      return 0 - (a.published_at > b.published_at ? 1 : -1);
    });
  }

  // // Debug logging
  // console.log('CategoryPage Debug:', {
  //   categoryName: category?.name,
  //   articlesCount: category?.articles?.length || 0,
  //   arrayLength: array?.length || 0,
  //   firstArticle: array?.[0],
  //   firstArticlePublishedAt: array?.[0]?.published_at,
  //   articlesWithPublishedAt: array?.filter(article => article?.published_at).length,
  //   isFallback: router.isFallback,
  //   routerReady: router.isReady,
  //   currentPath: router.asPath
  // });



  const [openArticleLead, setopenArticleLead] = useState(false);

  function toggleArticelLeadDialog() {
    setopenArticleLead(!openArticleLead);
  }

  const handleClickMonthlyDialog = () => {
    setopenArticleLead(true);
  };

  const [numberExists, setNumberExists] = useState(true);

  const addNumber = () => {
    if (!phone.value || phone.value == undefined) {
      setNumberExists(false);
    }
  };

  return (
    <MainOption navBarItems={navBarItems} fullWidth={true} noHeaderPadding={true}>
      <Head>
        <meta name="title" content={t("title", "withArtInFocus")} />
        <meta name="description" content={t("description")} />
        <meta name="url" content="https://artportable.com/artiklar" />
        <link rel="canonical" href={canonicalURL} />
      </Head>
      {router.isFallback && (
        <div>
          <h1>Sidan laddas...</h1>
 
       
        </div>
      )}
      {!router.isFallback && (
        <>
          <div className={s.flexHeaderButton}>
            <BannerText title={t("readAboutArt")} text={t("subHeader")}></BannerText>
          </div>

          {/* Main Content with Sidebar Layout */}
          <div className={s.mainContainer}>
            {isLoadingArticles ? (
              <div className={s.loadingContainer}>
                <Typography>Loading articles...</Typography>
              </div>
            ) : (
              <div className={s.responsiveContainer}>
                {/* Left Column - Redaktionellt */}
                <div className={s.leftColumn}>
                  <Typography variant="h3" className={s.sectionHeader}>
                    Redaktionellt
                  </Typography>
                  
                  {array && array.length > 0 ? array.slice(0, 4).map((article) => {
                    if (article && article.published_at) {
                      const articleCategorySlug = article.categories?.[0]?.slug || 
                                                article.publishCategory?.slug || 
                                                'artiklar';
                      
                      return (
                        <a
                          href={`/${router.locale}/${articleCategorySlug
                            .toLowerCase()
                            .replace(
                              "konstnärsporträtt",
                              "konstnaersportraett"
                            )}/${article.slug}`}
                          key={article.id}
                        >
                          <div className={s.articleCard}>
                         
                            <div className={s.articleImage}>
                              <img
                                alt="Cover Image"
                                src={article?.coverImage?.formats?.medium?.url || article?.coverImage?.formats?.small?.url}
                              />
                            </div>
                            
                            {/* Content Section */}
                            <div className={s.articleContent}>
                              <div>
                                {/* Category */}
                                <Typography className={s.articleCategory}>
                                  {article?.categories?.[0]?.name || 'Artikel'}
                                </Typography>
                                
                                {/* Date */}
                                <Typography className={s.articleDate}>
                                  {article?.published_at?.slice(0, 10)}
                                </Typography>
                                
                                {/* Title */}
                                <Typography className={s.articleTitle}>
                                  {article?.title}
                                </Typography>
                                
                                {/* Description */}
                                <Typography className={s.articleDescription}>
                                  {article?.description?.slice(0, 120)}...
                                </Typography>
                              </div>
                              
                              {/* Read More */}
                              <div className={s.readMore}>
                                <span>LÄS MER</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    }
                    return null;
                  }) : (
                    <div className={s.noArticlesContainer}>
                      No articles found
                    </div>
                  )}
                </div>

                {/* Right Column - Fler Nyheter */}
                <div className={s.rightColumn}>
                  <Typography variant="h4" className={s.sectionHeader}>
                    Fler Nyheter
                  </Typography>
                  
                  {array && array.length > 4 ? array.slice(4, 8).map((article) => {
                    if (article && article.published_at) {
                      const articleCategorySlug = article.categories?.[0]?.slug || 
                                                article.publishCategory?.slug || 
                                                'artiklar';
                      
                      return (
                        <div key={`sidebar-${article.id}`}>
                          <Link
                            href={`/${router.locale}/${articleCategorySlug
                              .toLowerCase()
                              .replace(
                                "konstnärsporträtt",
                                "konstnaersportraett"
                              )}/${article.slug}`}
                          >
                            <div className={s.rightColumnCard}>
                              {/* Image Section */}
                              <div className={s.rightColumnImage}>
                                <img
                                  alt="Cover Image"
                                  src={article?.coverImage?.formats?.medium?.url || article?.coverImage?.formats?.small?.url}
                                />
                              </div>
                              
                              {/* Content Section */}
                              <div>
                                {/* Category */}
                                <Typography className={s.rightColumnCategory}>
                                  {article?.categories?.[0]?.name || 'Artikel'}
                                </Typography>
                                
                                {/* Date */}
                                <Typography className={s.rightColumnDate}>
                                  {article?.published_at?.slice(0, 10)}
                                </Typography>
                                
                                {/* Title */}
                                <Typography className={s.rightColumnTitle}>
                                  {article?.title}
                                </Typography>
                                
                                {/* Description */}
                                <Typography className={s.rightColumnDescription}>
                                  {article?.description?.slice(0, 80)}...
                                </Typography>
                                
                                {/* Read More */}
                                <div className={s.rightColumnReadMore}>
                                  <span>LÄS MER</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  }) : null}
                </div>
              </div>
            )}
          </div>

          {/* Senaste från konstnärer - Separate Section */}
          <div className={s.storiesContainer}>
            <Typography variant="h3" className={s.sectionHeader}>
              Senaste från konstnärer
            </Typography>
            
            <div className={s.storiesGrid}>
              {displayStories && displayStories.length > 0 ? displayStories.slice(0, 4).map((story) => (
                <div key={`stories-${story.Id}`}>
                  <Link href={story?.Slug ? `/stories/${story.Slug}` : `/story/${story.Id}`}>
                    <div className={s.storyCard}>
                      {/* Image Section */}
                      <div className={s.storyImage}>
                        <img
                          alt="Story Image"
                          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${story?.PrimaryFile?.Name}`}
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div>
                        {/* Author */}
                        <Typography className={s.storyAuthor}>
                          {story.Name} {story.Surname}
                        </Typography>
                        
                        {/* Title */}
                        <Typography className={s.storyTitle}>
                          {story?.Title}
                        </Typography>
                        
                        {/* Read More */}
                        <div className={s.storyReadMore}>
                          <span>VISA MER</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )) : null}
            </div>
            
            {/* Visa mer button */}
            <div className={s.storiesButtonContainer}>
              <Link href="/newsroom">
                <Button className={s.storiesButton}>
                  Visa mer
                </Button>
              </Link>
            </div>
          </div>

          {/* Fler Konstnärsporträtt - Separate Section */}
          <div className={s.portraitsContainer}>
            <Typography variant="h3" className={s.sectionHeader}>
              Fler Konstnärsporträtt
            </Typography>
            
            {isLoadingArticles ? (
              <div className={s.loadingContainer}>
                <Typography>Loading artist portraits...</Typography>
              </div>
            ) : array && array.length > 0 ? (
              array
                .filter(article => 
                  article.categories?.some(cat => cat.slug === 'konstnaersportraett') ||
                  article.publishCategory?.slug === 'konstnaersportraett'
                )
                .slice(0, 2)
                .map((article) => {
                  if (article && article.published_at) {
                    const articleCategorySlug = 'konstnaersportraett';
                    return (
                      <div key={`portrait-${article.id}`}>
                        <Link
                          href={`/${router.locale}/${articleCategorySlug}/${article.slug}`}
                        >
                          <div className={s.portraitCard}>
                            {/* Image Section */}
                            <div className={s.portraitImage}>
                              <img
                                alt="Cover Image"
                                src={article?.coverImage?.formats?.medium?.url || article?.coverImage?.formats?.small?.url}
                              />
                            </div>
                            
                            {/* Content Section */}
                            <div className={s.portraitContent}>
                              <div>
                                {/* Category */}
                                <Typography className={s.portraitCategory}>
                                  Konstnärsporträtt
                                </Typography>
                                
                                {/* Date */}
                                <Typography className={s.portraitDate}>
                                  {article?.published_at?.slice(0, 10)}
                                </Typography>
                                
                                {/* Title */}
                                <Typography className={s.portraitTitle}>
                                  {article?.title}
                                </Typography>
                                
                                {/* Description */}
                                <Typography className={s.portraitDescription}>
                                  {article?.description?.slice(0, 120)}...
                                </Typography>
                              </div>
                              
                              {/* Read More */}
                              <div className={s.portraitReadMore}>
                                <span>LÄS MER</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                  return null;
                })
            ) : (
              <div className={s.noArticlesContainer}>
                No artist portraits found
              </div>
            )}
          </div>
        </>
      )}
    </MainOption>
  );
}
