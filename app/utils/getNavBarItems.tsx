export const getNavBarItems = async () => {

  const result = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/productlists`)
  const productlists = await result.json()

  if (productlists)
    return productlists.map((productList) => ({
      slug: productList.slug,
      title: productList.title,
      locale: productList.locale
    }))

  return [];
}
