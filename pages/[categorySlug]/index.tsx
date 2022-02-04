import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../../app/components/Main/Main'
import { Category } from '../../app/models/Category';
import { Locales } from '../../app/models/i18n/locales';
import { Article } from '../../app/models/Article';
import { useRouter } from 'next/router';
import { Localization } from '../../app/models/Localization';
import { Typography, Box, Tab, Tabs } from '@material-ui/core';
import { route } from 'next/dist/next-server/server/router';
import { styles } from '../../styles/[categorySlug].css';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';
import { useTranslation } from 'next-i18next'
import { ar } from 'date-fns/locale';
import Button from '../../app/components/Button/Button'
import MuiButton from '@material-ui/core/Button'

export default function CategoryPage({ category }: { category: Category }) {
  const s = styles();
  const router = useRouter()
  const { t } = useTranslation(['articles']);

  // var newCategoryArray = category.articles.slice().reverse();

  return (
    <Main>
      {router.isFallback &&
        //implement good skeleton here
        <div>Loading...</div>
      }
      {!router.isFallback &&
        <>

          <div>
            <>
              <div className={s.categories}>
                {category.name === 'Artiklar' || category.name === 'Stories' ?
                  <Typography className={s.categoryHeading} component="h1" variant={'h3'}>
                    {t('latest')}
                  </Typography>
                  :
                  <Typography className={s.categoryHeading} component="h3" variant={'h3'}>
                    {category.name}<span className={s.underline}></span>
                  </Typography>
                }
              </div>
              <div className={s.menuFlex}>
                <Link href="/artiklar">
                  <a>
                    <MuiButton color="default" size="large">
                      {t('latestMenu')}
                    </MuiButton>
                  </a>
                </Link>
                <Link href="/redaktionellt">
                  <a>
                    <MuiButton color="default" size="large">
                      {t('editorial')}
                    </MuiButton>
                  </a>
                </Link>
                <Link href="/konstnaersportraett">
                  <a>
                    <MuiButton color="default" size="large">
                      {t('artistPortrait')}
                    </MuiButton>
                  </a>
                </Link>
                {/* <Typography className={s.categoryHeadingSecondary} component="h1" variant={'h3'}> */}

                <a href="https://old.artportable.com/stories/" target="blank">
                  <MuiButton color="default" size="large">
                    {t('earlierArticles')}
                  </MuiButton>
                </a>



              </div>
            </>
          </div>
          <div className={s.flex}>
            {category?.articles?.slice().reverse().map((article) => {
              if (article.published_at)
                return (
                  <div key={article.id}>
                    <Link href={`/${category.name.toLowerCase().replace('konstnärsporträtt','konstnaersportraett')}/${article.slug}`}>
                      <a>
                        <div className={s.wrapper}>
                          <img className={s.coverImage} src={article?.coverImage?.formats?.small?.url} />
                          <div className={s.textContent}>
                            <div>
                              {article.created_at.slice(0, -14)}
                            </div>

                            <Typography component="h2" variant={'h2'}>
                              <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium" className={s.headline}>
                                {article.title} {router.locale !== article.locale ? '(In Swedish)' : ''}
                              </Box>
                            </Typography>
                            <Typography variant={'subtitle1'}>{article.description}</Typography>
                          </div>
                          <div className={s.line}></div>
                        </div>
                      </a>
                    </Link>
                  </div>
                )
            })}
          </div>
        </>
      }
    </Main >
  );
}

export async function getStaticProps({ params, locale }) {
  let res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories/slug/${params.categorySlug}?populate=articles,articles.coverImage,articles.authors,articles.authors.picture,localizations`)
  if (!res.ok) {
    return {
      notFound: true,
    }
  }
  var category = await res.json()
  if (locale != category.locale) {
    var newLocale = category.localizations.find((categoryLocale: Localization) => categoryLocale.locale == locale);
    if (newLocale == null) {
      return {
        notFound: true,
      }
    }
    let res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories/${newLocale.id}?populate=articles,articles.authors,articles.coverImage,articles.authors.picture,localizations`)
    category = await res.json();
    return {
      redirect: {
        destination: `/${category.slug}`,
        permanent: true,
      },
    }
  }

  if (category.locale != Locales.sv) {
    var swedishCategoryLocale = category.localizations.find(locale => locale.locale == Locales.sv);
    if (swedishCategoryLocale) {
      let res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?categories[]=${swedishCategoryLocale.id}`)
      var swedishArticles: Article[] = await res.json();
      if (swedishArticles && swedishArticles.length > 0) {
        var swedishArticles = swedishArticles.filter(article => !article.localizations.some(locale => locale.locale == Locales.en));
        category.articles.push(...swedishArticles);
      }
    }
  }


  return {
    props: {
      category: category,
      ...await serverSideTranslations(locale, []),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories`)
  const categories = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((category: Category) => ({
    params: { categorySlug: category.slug }, locale: category.locale
  }))

  // We'll pre-render only these paths at build time.
  // {fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true }
}