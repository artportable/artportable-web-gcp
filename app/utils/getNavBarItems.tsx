export const getNavBarItems = async () => {

  const result = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/productlists`)
  const productlists = await result.json()

  if (productlists)
    return productlists.map((productList) => ({
      slug: productList.slug,
      menuTitle: productList.menuTitle,
      locale: productList.locale
    }))

  return [];
}
