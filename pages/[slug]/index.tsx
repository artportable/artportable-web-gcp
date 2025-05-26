import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Category } from "../../app/models/Category";
import { Locales } from "../../app/models/i18n/locales";
import { Article } from "../../app/models/Article";
import { Localization } from "../../app/models/Localization";
import CategoryPage from "../../app/components/CategoryPage/CategoryPage";
import { NavBarItem } from "../../app/models/NavBarItem";
import { getNavBarItems } from "../../app/utils/getNavBarItems";

export default function slugPage({
  category = null,
  navBarItems = [],
}: {
  category: Category;
  navBarItems: NavBarItem[];
}) {
  if (category) {
    return <CategoryPage category={category} navBarItems={navBarItems} />;
  }
  return <></>;
}

export async function getStaticProps({ params, locale }) {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?filters[slug][$eq]=${params.slug}&populate[articles][populate][0]=coverImage&populate[articles][populate][1]=authors&populate[articles][populate][2]=authors.picture&populate[localizations]=*`,
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
  var category = response.data[0];
  
  if (!category) {
    return { notFound: true };
  }

  // Extract attributes and add id for v4 compatibility
  const categoryData = {
    id: category.id,
    ...category.attributes,
    // Convert articles from v4 format
    articles: category.attributes.articles?.data?.map(article => ({
      id: article.id,
      ...article.attributes,
      // Map publishedAt to published_at for compatibility
      published_at: article.attributes.publishedAt,
      coverImage: article.attributes.coverImage?.data?.attributes || null,
      authors: article.attributes.authors?.data?.map(author => ({
        id: author.id,
        ...author.attributes,
        picture: author.attributes.picture?.data?.attributes || null
      })) || []
    })) || []
  };

  const navBarItems = await getNavBarItems();

  if (locale != categoryData.locale) {
    var newLocale = categoryData.localizations?.data?.find(
      (categoryLocale: any) => categoryLocale.attributes.locale == locale
    );

    if (newLocale == null) {
      return {
        notFound: true,
      };
    }

    let localeRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories/${newLocale.id}?populate[articles][populate][0]=coverImage&populate[articles][populate][1]=authors&populate[articles][populate][2]=authors.picture&populate[localizations]=*`,
      {
        // timeout: 11000
      }
    );
    
    if (localeRes.ok) {
      const localeResponse = await localeRes.json();
      const localizedCategory = {
        id: localeResponse.data.id,
        ...localeResponse.data.attributes,
        // Convert articles from v4 format
        articles: localeResponse.data.attributes.articles?.data?.map(article => ({
          id: article.id,
          ...article.attributes,
          // Map publishedAt to published_at for compatibility
          published_at: article.attributes.publishedAt,
          coverImage: article.attributes.coverImage?.data?.attributes || null,
          authors: article.attributes.authors?.data?.map(author => ({
            id: author.id,
            ...author.attributes,
            picture: author.attributes.picture?.data?.attributes || null
          })) || []
        })) || []
      };

      return {
        redirect: {
          destination: `/${locale}/${localizedCategory.slug}`,
          permanent: true,
        },
      };
    }
  }

  return {
    props: {
      navBarItems: navBarItems,
      category: categoryData,
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories`, {
    // timeout: 11000
  });
  
  if (!res.ok) {
    return { paths: [], fallback: true };
  }

  const response = await res.json();
  const categories = response.data;

  var categoriesPaths = [];
  
  if (categories) {
    categoriesPaths = categories.map((category: any) => ({
      params: { slug: category.attributes.slug },
      locale: category.attributes.locale,
    }));
  }

  return { paths: categoriesPaths, fallback: true };
}
