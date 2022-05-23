import { fetchWithTimeout } from './util'

export const getNavBarItems = async () => {
 try {
  const result = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}productlists`, {
    // timeout: 11000
  })
  const productlists = await result.json()

  if (productlists)
    return productlists.map((productList) => ({
      slug: productList.slug,
      menuTitle: productList.menuTitle,
      locale: productList.locale
    })
    )}
    catch (error) {
    // Timeouts if the request takes
    // longer than 6 seconds
    console.log(error.name === 'AbortError');
  }

  return [];
}