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

  useEffect(() => {
    setArray(category?.articles || []);
  }, [category, router.asPath]);

  // Kan ses över och snygga till genom att ha en array.sort en gång istället för 2.
  const [array, setArray] = useState(category?.articles || []);
  
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
    <Main navBarItems={navBarItems}>
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
            <div>
              <div className={s.headerDiv}>
                <Typography className={s.header} variant="h1">
                  {t("readAboutArt")}
                </Typography>
              </div>
              <div className={s.subheaderDiv}>
                <Typography variant="h4" component="p" className={s.subHeader}>
                  {t("subHeader")}
                </Typography>
              </div>
            </div>
            <Divider />

            {/* Stories Section */}
            <div style={{ margin: '40px 0' }}>
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

            <div className={s.articleLeadFlex}>
              {isSignedIn.value && (
                <div className={s.articleLeadDiv}>
                  <Button
                    rounded
                    className={s.articleLeadButton}
                    onClick={() => {
                      handleClickMonthlyDialog();
                      addNumber();
                    }}
                  >
                    <Typography className={s.headerButton}>
                      {t("arcticleAboutYou")}
                    </Typography>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <ArticleLead
            open={openArticleLead}
            onClose={toggleArticelLeadDialog}
            numberExists={numberExists}
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            {array && array.length > 0 ? array.map((article) => {
              if (article && article.published_at)
                return (
                  <div key={article.id} style={{ marginBottom: '30px' }}>
                    <Link
                      href={`/${router.locale}/${category.name
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
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}>
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
                                {article?.categories?.[0]?.name || category?.name}
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
            }) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No articles found
              </div>
            )}
          </div>
        </>
      )}
    </Main>
  );
}
