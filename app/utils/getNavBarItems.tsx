import { fetchWithTimeout } from "./util";

export const getNavBarItems = async () => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories`,
      {
        // timeout: 11000
      }
    );
    
    if (!result.ok) {
      console.log('Failed to fetch categories for navbar:', result.status);
      return [];
    }
    
    const response = await result.json();
    const categories = response.data;

    if (categories)
      return categories.map((category) => ({
        slug: category.attributes.slug,
        menuTitle: category.attributes.menuTitle || category.attributes.name,
        locale: category.attributes.locale,
      }));
  } catch (error) {
    // Timeouts if the request takes
    // longer than 6 seconds
    console.log('Error fetching navbar items:', error);
  }

  return [];
};
