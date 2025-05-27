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

        // Combine and convert articles
        const allArticles = [
          ...(artiklarData.data || []).map(convertArticle),
          ...(konstnaersportraettData.data || []).map(convertArticle)
        ];

        setArray(allArticles);
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
    <MainOption navBarItems={navBarItems} fullWidth={true}>
      <Head>
        <meta name="title" content={t("title", "withArtInFocus")} />
        <meta name="description" content={t("description")} />
        <meta name="url" content="https://artportable.com/artiklar" />
        <link rel="canonical" href={canonicalURL} />
      </Head>
      {router.isFallback && (
        <div>
          <h1>Loading category page...</h1>
          <p>Path: {router.asPath}</p>
          <p>This page is being generated...</p>
        </div>
      )}
      {!router.isFallback && (
        <>
          <div className={s.flexHeaderButton}>
       
              <BannerText title={t("readAboutArt")} text={t("subHeader")}></BannerText>
           
            {/* <Divider /> */}
     
          </div>
      

          {/* Main Content with Sidebar Layout */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            {isLoadingArticles ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Typography>Loading articles...</Typography>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '40px' }}>
                {/* Left Column - Main Articles (Redaktionellt) */}
                <div style={{ flex: '2' }}>
                  <Typography variant="h3" style={{ 
                    fontFamily: "Roboto !important",
                    marginBottom: '30px', 
                    marginTop: "20px",
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '32px'
                  }}>
                    Redaktionellt
                  </Typography>
                  
                  {array && array.length > 0 ? array.slice(0, 4).map((article) => {
                    if (article && article.published_at) {
                      const articleCategorySlug = article.categories?.[0]?.slug || 
                                                article.publishCategory?.slug || 
                                                'artiklar';
                      
                      return (
                        <div key={article.id} style={{ marginBottom: '30px' }}>
                          <Link
                            href={`/${router.locale}/${articleCategorySlug
                              .toLowerCase()
                              .replace(
                                "konstnärsporträtt",
                                "konstnaersportraett"
                              )}/${article.slug}`}
                          >
                            <a style={{ textDecoration: 'none', color: 'inherit' }}>
                              <div style={{
                                display: 'flex',
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                paddingLeft:"20px",
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer'
                              }}
    
                              >
                                {/* Image Section */}
                                <div style={{
                                  width: '250px',
                                  height: '210px',
                                  flexShrink: 0,
                                  overflow: 'hidden'
                                }}>
                                  <img
                                    alt="Cover Image"
                                    src={article?.coverImage?.formats?.medium?.url || article?.coverImage?.formats?.small?.url}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                </div>
                                
                                {/* Content Section */}
                                <div style={{
                                  flex: 1,
                                  padding: '20px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between'
                                }}>
                                  <div>
                                    {/* Category */}
                                    <Typography style={{
                                      color: '#1976d2',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      marginBottom: '8px',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px'
                                    }}>
                                      {article?.categories?.[0]?.name || 'Artikel'}
                                    </Typography>
                                    
                                    {/* Date */}
                                    <Typography style={{
                                      color: '#666',
                                      fontSize: '14px',
                                      marginBottom: '12px'
                                    }}>
                                      {article?.published_at?.slice(0, 10)}
                                    </Typography>
                                    
                                    {/* Title */}
                                    <Typography style={{
                                      fontSize: '22px',
                                      fontWeight: 'bold',
                                      color: '#333',
                                      lineHeight: '1.3',
                                      marginBottom: '12px',
                                      fontFamily: 'Roboto'
                                    }}>
                                      {article?.title}
                                    </Typography>
                                    
                                    {/* Description */}
                                    <Typography style={{
                                      color: '#666',
                                      fontSize: '15px',
                                      lineHeight: '1.5',
                                      marginBottom: '16px',
                                      fontFamily: 'Joan'
                                    }}>
                                      {article?.description?.slice(0, 120)}...
                                    </Typography>
                                  </div>
                                  
                                  {/* Read More */}
                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Typography style={{
                                      color: 'gray',
                                      fontSize: '14px',
                                      fontWeight: '600',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px'
                                    }}>
                                      LÄS MER
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  }) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                      No articles found
                    </div>
                  )}
                </div>

                {/* Right Column - Sidebar (Fler Nyheter) */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <Typography variant="h4" style={{ 
                    marginBottom: '30px', 
                    fontWeight: 'bold',
                    marginTop: "20px",
                    color: '#333',
                    fontSize: '24px'
                  }}>
                    Fler Nyheter
                  </Typography>
                  
                  {array && array.length > 4 ? array.slice(4, 8).map((article) => {
                    if (article && article.published_at) {
                      const articleCategorySlug = article.categories?.[0]?.slug || 
                                                article.publishCategory?.slug || 
                                                'artiklar';
                      
                      return (
                        <div key={`sidebar-${article.id}`} style={{ marginBottom: '20px' }}>
                          <Link
                            href={`/${router.locale}/${articleCategorySlug
                              .toLowerCase()
                              .replace(
                                "konstnärsporträtt",
                                "konstnaersportraett"
                              )}/${article.slug}`}
                          >
                            <a style={{ textDecoration: 'none', color: 'inherit' }}>
                              <div style={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer'
                              }}
                           >
                                {/* Content Section */}
                                <div style={{ padding: '16px' }}>
                                  {/* Category */}
                                  <Typography style={{
                                    color: '#1976d2',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    {article?.categories?.[0]?.name || 'Artikel'}
                                  </Typography>
                                  
                                  {/* Title */}
                                  <Typography style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    lineHeight: '1.3',
                                    marginBottom: '8px',
                                    fontFamily: 'LyonDisplay'
                                  }}>
                                    {article?.title}
                                  </Typography>
                                  
                                  {/* Date */}
                                  <Typography style={{
                                    color: '#666',
                                    fontSize: '12px',
                                    marginBottom: '8px'
                                  }}>
                                    {article?.published_at?.slice(0, 10)}
                                  </Typography>
                                </div>
                              </div>
                            </a>
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

          <div style={{  margin: "0 auto" }}>
              <Typography variant="h4" style={{ 
                marginBottom: '30px', 
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Latest Stories
              </Typography>
              
              {storiesLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Typography>Loading stories...</Typography>
                </div>
              ) : (
                <Grid container spacing={3} justifyContent="center">
                  {displayStories.map((story) => (
                    <Grid item xs={12} sm={6} md={3} key={story.Id}>
                      <StoryComponent story={story} isIndex={true} showDescription={false} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>

          {/* Fler Konstnärsporträtt Section */}
          <div style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
            <Typography variant="h3" style={{ 
              marginBottom: '30px', 
              fontWeight: 'bold',
              color: '#333',
              fontSize: '28px'
            }}>
              Fler Konstnärsporträtt
            </Typography>
            
            {isLoadingArticles ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Typography>Loading artist portraits...</Typography>
              </div>
            ) : array && array.length > 0 ? (
              array
                .filter(article => 
                  article.categories?.some(cat => cat.slug === 'konstnaersportraett') ||
                  article.publishCategory?.slug === 'konstnaersportraett'
                )
                .map((article) => {
                  if (article && article.published_at) {
                    const articleCategorySlug = 'konstnaersportraett';
                    return (
                      <div key={`portrait-${article.id}`} style={{ marginBottom: '30px' }}>
                        <Link
                          href={`/${router.locale}/${articleCategorySlug}/${article.slug}`}
                        >
                          <a style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                              display: 'flex',
                              backgroundColor: '#fff',
                              alignItems: 'center',
                              paddingLeft:"20px",
                              borderRadius: '8px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              overflow: 'hidden',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                              cursor: 'pointer'
                            }}
                         >
                              {/* Image Section */}
                              <div style={{
                                width: '300px',
                                height: '200px',
                                flexShrink: 0,
                                overflow: 'hidden'
                              }}>
                                <img
                                  alt="Cover Image"
                                  src={article?.coverImage?.formats?.medium?.url || article?.coverImage?.formats?.small?.url}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                              </div>
                              
                              {/* Content Section */}
                              <div style={{
                                flex: 1,
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                              }}>
                                <div>
                                  {/* Category */}
                                  <Typography style={{
                                    color: '#1976d2',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    Konstnärsporträtt
                                  </Typography>
                                  
                                  {/* Date */}
                                  <Typography style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    marginBottom: '12px'
                                  }}>
                                    {article?.published_at?.slice(0, 10)}
                                  </Typography>
                                  
                                  {/* Title */}
                                  <Typography style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    lineHeight: '1.3',
                                    marginBottom: '12px',
                                    fontFamily: 'LyonDisplay'
                                  }}>
                                    {article?.title}
                                    {router.locale !== article?.locale ? " (In Swedish)" : ""}
                                  </Typography>
                                  
                                  {/* Description */}
                                  <Typography style={{
                                    color: '#666',
                                    fontSize: '16px',
                                    lineHeight: '1.5',
                                    marginBottom: '16px',
                                    fontFamily: 'Joan'
                                  }}>
                                    {article?.description}
                                  </Typography>
                                </div>
                                
                                {/* Read More */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  <Typography style={{
                                    color: '#1976d2',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    LÄS MER
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div>
                    );
                  }
                  return null;
                })
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No artist portraits found
              </div>
            )}
          </div>
        </>
      )}
    </MainOption>
  );
}
