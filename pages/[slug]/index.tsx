import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Category } from "../../app/models/Category";
import { Locales } from "../../app/models/i18n/locales";
import { Article } from "../../app/models/Article";
import { Localization } from "../../app/models/Localization";
import CategoryPage from "../../app/components/CategoryPage/CategoryPage";
import ProductListPage from "../../app/components/ProductListPage/ProductListPage";
import { ProductList } from "../../app/models/ProductList";
import { NavBarItem } from "../../app/models/NavBarItem";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import { fetchWithTimeout } from "../../app/utils/util";

export default function slugPage({
  category = null,
  productList = null,
  navBarItems = [],
}: {
  category: Category;
  productList: ProductList;
  navBarItems: NavBarItem[];
}) {
  const page = () => {
    if (category)
      return <CategoryPage category={category} navBarItems={navBarItems} />;
    if (productList)
      return (
        <ProductListPage productList={productList} navBarItems={navBarItems} />
      );
    return <></>;
  };

  return page();
}

export async function getStaticProps({ params, locale }) {
  let pageType;

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories/slug/${params.slug}?populate=articles,articles.coverImage,articles.authors,articles.authors.picture,localizations`,
    {
      // timeout: 11000
    }
  );
  if (res.ok) {
    pageType = "articleCategory";
  } else {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/productlists/slug/${params.slug}`,
      {
        // timeout: 11000
      }
    );
    if (res.ok) {
      pageType = "productList";
    } else {
      return {
        notFound: true,
      };
    }
  }

  const navBarItems = await getNavBarItems();
  switch (pageType) {
    case "articleCategory":
      var category = await res.json();

      if (locale != category.locale) {
        var newLocale = category.localizations.find(
          (categoryLocale: Localization) => categoryLocale.locale == locale
        );
        if (newLocale == null) {
          return {
            notFound: true,
          };
        }
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories/${newLocale.id}?populate=articles,articles.authors,articles.coverImage,articles.authors.picture,localizations`,
          {
            // timeout: 11000
          }
        );
        category = await res.json();
        return {
          redirect: {
            destination: `/${locale}/${category.slug}`,
            permanent: true,
          },
        };
      }

      if (category.locale != Locales.sv) {
        var swedishCategoryLocale = category.localizations.find(
          (locale) => locale.locale == Locales.sv
        );
        if (swedishCategoryLocale) {
          let res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?categories[]=${swedishCategoryLocale.id}`,
            {
              // timeout: 11000
            }
          );
          var swedishArticles: Article[] = await res.json();
          if (swedishArticles && swedishArticles.length > 0) {
            var swedishArticles = swedishArticles.filter(
              (article) =>
                !article.localizations.some(
                  (locale) => locale.locale == Locales.en
                )
            );
            category.articles.push(...swedishArticles);
          }
        }
      }

      return {
        props: {
          navBarItems: navBarItems,
          category: category,
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
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 60 seconds
        revalidate: 60, // In seconds
      };

    case "productList":
      var productList = await res.json();

      if (locale != productList.locale) {
        var newLocale = productList.localizations.find(
          (productListLocale) => productListLocale.locale == locale
        );
        if (newLocale == null) {
          return {
            notFound: true,
          };
        }
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/productlists/${newLocale.id}`,
          {
            // timeout: 11000
          }
        );
        productList = await res.json();
        return {
          redirect: {
            destination: `/${productList.slug}`,
            permanent: true,
          },
        };
      }

      return {
        props: {
          navBarItems: navBarItems,
          productList: productList,
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

    default:
      return {
        props: {},
        notFound: true,
        revalidate: 60,
      };
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories`, {
    // timeout: 11000
  });
  const categories = await res.json();

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/productlists`,
    {
      // timeout: 11000
    }
  );
  const productlists = await result.json();

  var categoriesPaths = [];
  var productListsPaths = [];
  // Get the paths we want to pre-render based on posts
  if (categories)
    categoriesPaths = categories.map((category: Category) => ({
      params: { slug: category.slug },
      locale: category.locale,
    }));
  if (productlists)
    productListsPaths = productlists.map((productList) => ({
      params: { slug: productList.slug },
      locale: productList.locale,
    }));

  const paths = [...categoriesPaths, ...productListsPaths];
  // We'll pre-render only these paths at build time.
  // {fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true };
}
