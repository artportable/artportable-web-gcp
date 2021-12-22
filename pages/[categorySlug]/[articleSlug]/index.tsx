import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Main from '../../../app/components/Main/Main'
import { Article } from '../../../app/models/Article';
import { Category } from '../../../app/models/Category';
import { Typography, Paper } from '@material-ui/core';
import { styles } from './index.css';


export default function ArticlePage({ article }: { article: Article }) {
  const s = styles();
  const router = useRouter()

  const cate = article.categories;
  const listItems = cate.map((cats) =>
    <li>{cats}</li>
  );

  return (
    <Main>
      {router.isFallback &&
        //implement good skeleton here
        <div>Loading...</div>
      }
      {!router.isFallback &&
        <>
          <div className={s.container}>
            <Paper className={s.paper}>
              {!!!article.published_at && //No publish date means article is in draft
                <Typography color={'primary'} variant={'h1'}>Preview Mode</Typography>
              }
              <Typography variant={'h1'}>
                {article.created_at}
              </Typography>
               <Typography variant={'subtitle2'}>{article.description}</Typography>
              {/* {article.authors.map(author => {
                return (
                  <>
                    <Typography>Author/Författare :{author.name}</Typography>
                    <img src={author.picture.formats.thumbnail.url} />
                  </>
                )
              })} */}
              <Typography variant={'h1'}>
                {article}
              </Typography>
              <Typography variant={'h1'}>
                {article.title}
              </Typography>

              <Typography variant={'subtitle1'}>
                {article.description}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </Paper>
          </div>
        </>
      }
    </Main>
  );
}

export async function getStaticProps(context) {
  const { locale, params, preview } = context;
  let res = await fetch(`${process.env.STRAPI_URL}/articles/slug/${params.articleSlug}?_locale=${locale}&categories.slug=${params.categorySlug}${preview ? '&_publicationState=preview' : ''}`)
  var articles = await res.json()
  var article: Article = articles.find((article: Article) => article.locale == locale);
  if (article == null) {
    let categoryRes = await fetch(`${process.env.STRAPI_URL}/categories/slug/${params.categorySlug}`)
    if (!categoryRes.ok) {
      return {
        notFound: true,
      }
    }
    var currentCategory = await categoryRes.json()
    let res = await fetch(`${process.env.STRAPI_URL}/articles/slug/${params.articleSlug}?categories_in=${currentCategory.id}&categories_in=${currentCategory.localizations[0]?.id}${preview ? '&_publicationState=preview' : ''}`)
    if (!res.ok) {
      return {
        notFound: true,
      }
    }
    article = await res.json()
    categoryRes = await fetch(`${process.env.STRAPI_URL}/categories?localizations.id=${article.publishCategory.id}&_locale=${locale}`)
    var newLocaleCategories = await categoryRes.json();
    var newLocaleCategory: Category = newLocaleCategories.find((category: Category) => category.locale == locale);
    if (newLocaleCategory && newLocaleCategory.id !== currentCategory.id && locale !== article.locale) {
      return {
        redirect: {
          destination: `/${newLocaleCategory.slug}/${article.slug}`,
          permanent: true,
        },
      }
    }
  }

  if (article.publishCategory.slug !== params.categorySlug && locale === article.locale) {
    return {
      redirect: {
        destination: `/${article.publishCategory.slug}/${article.slug}`,
        permanent: true,
      },
    }
  }

  return {
    props: {
      article: article,
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
  const res = await fetch(`${process.env.STRAPI_URL}/articles?_locale=all`)
  const articles = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = articles.map((article: Article) => ({
    params: { categorySlug: article.publishCategory.slug, articleSlug: article.slug }, locale: article.locale
  }))

  // We'll pre-render only these paths at build time.
  // {fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true }
}