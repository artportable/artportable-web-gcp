import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../../app/components/Main/Main'
import { Category } from '../../app/models/Category';
import { Locales } from '../../app/models/i18n/locales';
import { Article } from '../../app/models/Article';
import { useRouter } from 'next/router';
import { Localization } from '../../app/models/Localization';
import { Typography } from '@material-ui/core';

export default function CategoryPage({ category }: { category: Category }) {

  const router = useRouter()

  return (
    <Main>
      {router.isFallback &&
        //implement good skeleton here
        <div>Loading...</div>
      }
      {!router.isFallback &&
        <>
          <Typography variant={'h1'}>
            {category.name}
          </Typography>
          {category.articles.map((article) => {
            return (
              <Typography variant={'subtitle1'}>
                {article.title}
              </Typography>
            )
          })}
        </>
      }
    </Main>
  );
}

export async function getStaticProps({ params, locale }) {
  let res = await fetch(`${process.env.STRAPI_URL}/categories/slug/${params.categorySlug}`)
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
    let res = await fetch(`${process.env.STRAPI_URL}/categories/${newLocale.id}`)
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
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true }
}