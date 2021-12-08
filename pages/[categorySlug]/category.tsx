import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../../app/components/Main/Main'
import { Category } from '../../app/models/Category';
import { Locales } from '../../app/models/i18n/locales';
import router from 'next/router'
import { Article } from '../../app/models/Article';

export default function Category() {

  return (
    <Main>
    </Main>
  );
}


export async function getStaticProps({ params }) {
  var category = params.category as Category;
  if (!category) {
    let res = await fetch(`${process.env.STRAPI_URL}/categories/slug/${params.categorySlug}`)
    category = await res.json()
    if (category == null) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      }
    }
  }
  if (router.locale != category.locale) {
    var newLocale = category.localizations.find(locale => locale.locale == router.locale);
    let res = await fetch(`${process.env.STRAPI_URL}/categories/slug/${params.categorySlug}`)
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
        var swedishArticles = swedishArticles.filter(article => !article.localizations.some(locale => locale.)
        }
    }
  }


  return {
    props: {
      posts,
      ...await serverSideTranslations(params.locale, []),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch(`${process.env.STRAPI_URL}/categories?_locale=all`)
  const categories = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((category: Category) => ({
    params: { categorySlug: category.slug, category: category }, locale: category.locale
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}