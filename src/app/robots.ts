import type { MetadataRoute } from 'next'

const BASE_URL = process.env.BASE_URL || "https://www.hashtel.in";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/default/cart',"/default/account",'/b2b/cart',"/b2b/account"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}