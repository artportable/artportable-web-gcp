import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../../app/components/Main/Main'
import { Category } from '../../app/models/Category';
import { Locales } from '../../app/models/i18n/locales';
import { Article } from '../../app/models/Article';
import { useRouter } from 'next/router';
import { Localization } from '../../app/models/Localization';
import { Typography, Box } from '@material-ui/core';
import { route } from 'next/dist/next-server/server/router';
import { styles } from './index.css';
import Link from "next/link";
import { useEffect } from 'react';

export default function CategoryPage({ category }: { category: Category }) {
  const s = styles();
  const router = useRouter()

  const dateString = category.created_at.slice(0, -14);
  const trimmedDate = dateString.slice(0, -14);

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
              {category.name === 'Artiklar' ?
                <Typography variant={'h1'}>
                  Senast
                </Typography>
                :
                <Typography variant={'h1'}>
                  {category.name}
                </Typography>
              }
            </>

          </div>
          <div className={s.flex}>
            {category.articles.reverse().map((article) => {
              return (
                <div >
                  <Link as={`/${category.name.toLowerCase()}/${article.slug}`} href="/article/[id]">
                    <a>
                      <div className={s.wrapper}>
                        <img className={s.coverImage} src={article.coverImage.formats.small.url} />
                        <div className={s.ap}>
                          <div>
                            {article.created_at.slice(0, -14)}
                          </div>

                          <Typography variant={'h2'}>
                            <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium" className={s.headline}>
                              {article.title} {router.locale !== article.locale ? '(In Swedish)' : ''}
                            </Box>
                          </Typography>
                          {article.authors.map(author => {
                            return (
                              <>
                                <Typography>Author/Författare :{author.name}</Typography>
                                {/* <img src={author.picture.formats.thumbnail.url} /> */}
                              </>
                            )
                          })}
                          <Typography variant={'subtitle2'}>{article.description}</Typography>
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
  let res = await fetch(`${process.env.STRAPI_URL}/categories/slug/${params.categorySlug}?populate=articles,articles.coverImage,articles.authors,articles.authors.picture,localizations`)
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
    let res = await fetch(`${process.env.STRAPI_URL}/categories/${newLocale.id}?populate=articles,articles.authors,articles.coverImage,articles.authors.picture,localizations`)
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
      let res = await fetch(`${process.env.STRAPI_URL}/articles?categories[]=${swedishCategoryLocale.id}`)
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
  const res = await fetch(`${process.env.STRAPI_URL}/categories`)
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