import { useContext, useEffect } from "react";
import {
  Box,
  Link,
  Menu,
  MenuItem,
  Tab,
  Tabs,
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

  // Debug logging
  console.log('CategoryPage Debug:', {
    categoryName: category?.name,
    articlesCount: category?.articles?.length || 0,
    arrayLength: array?.length || 0,
    firstArticle: array?.[0],
    firstArticlePublishedAt: array?.[0]?.published_at,
    articlesWithPublishedAt: array?.filter(article => article?.published_at).length,
    isFallback: router.isFallback,
    routerReady: router.isReady,
    currentPath: router.asPath
  });

  const [value, setValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Generate navigation options from actual categories
  const navigationOptions = navBarItems.map((item) => ({
    value: item.slug,
    label: item.menuTitle,
    href: `/${item.slug}`,
  }));

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
          <div className={s.tabsContainer}>
            <Tabs
              className={s.artistTab}
              value={value}
              onChange={handleChange}
              aria-label="navigation"
              variant={"scrollable"}
              scrollButtons={"on"}
            >
              {navigationOptions.map((option) => (
                <Tab
                  className={s.text}
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  onClick={() => router.push(option.href)}
                />
              ))}
              {isSignedIn.value && (
                <Tab
                  className={s.text}
                  key="medlemserbjudanden"
                  value="/medlemserbjudanden"
                  label={t("membershipOffers")}
                  onClick={() => router.push("/medlemserbjudanden")}
                />
              )}
            </Tabs>
          </div>
          <div className={s.flex}>
            {array && array.length > 0 ? array.map((article) => {
              if (article && article.published_at)
                return (
                  <div key={article.id}>
                    {router.locale === "en" ||
                    router.locale === "da" ||
                    router.locale === "nb" ? (
                      <>
                        <Link
                          className={s.link}
                          href={`/${router.locale}/${category.name
                            .toLowerCase()
                            .replace(
                              "konstnärsporträtt",
                              "konstnaersportraett"
                            )}/${article.slug}`}
                        >
                          <a>
                            <div className={s.wrapper}>
                              <img
                                alt="Cover Image"
                                className={s.coverImage}
                                src={article?.coverImage?.formats?.small?.url}
                              />
                              <div className={s.textContent}>
                                <div>
                                  {article?.published_at?.slice(0, -14)}
                                </div>
                                <Typography component="h2" variant={"h2"}>
                                  <Box
                                    fontFamily="LyonDisplay"
                                    fontWeight="fontWeightMedium"
                                    className={s.headline}
                                  >
                                    {article?.title}{" "}
                                    {router.locale !== article?.locale
                                      ? "(In Swedish)"
                                      : ""}
                                  </Box>
                                </Typography>
                                <Typography
                                  variant={"subtitle1"}
                                  style={{ fontFamily: "Joan" }}
                                >
                                  {article?.description}
                                </Typography>
                              </div>
                              <div className={s.line}></div>
                            </div>
                          </a>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          className={s.link}
                          href={`/${router.locale}/${category.name
                            .toLowerCase()
                            .replace(
                              "konstnärsporträtt",
                              "konstnaersportraett"
                            )}/${article.slug}`}
                        >
                          <a>
                            <div className={s.wrapper}>
                              <img
                                alt="Cover Image"
                                className={s.coverImage}
                                src={article?.coverImage?.formats?.small?.url}
                              />
                              <div className={s.textContent}>
                                <div>
                                  {article?.published_at?.slice(0, -14)}
                                </div>
                                <Typography component="h2" variant={"h2"}>
                                  <Box
                                    fontFamily="LyonDisplay"
                                    fontWeight="fontWeightMedium"
                                    className={s.headline}
                                  >
                                    {article?.title}{" "}
                                    {router.locale !== article?.locale
                                      ? "(In Swedish)"
                                      : ""}
                                  </Box>
                                </Typography>
                                <Typography
                                  variant={"subtitle1"}
                                  style={{ fontFamily: "Joan" }}
                                >
                                  {article?.description}
                                </Typography>
                              </div>
                              <div className={s.line}></div>
                            </div>
                          </a>
                        </Link>
                      </>
                    )}
                  </div>
                );
            }) : (
              <div>No articles found</div>
            )}
          </div>
        </>
      )}
    </Main>
  );
}
