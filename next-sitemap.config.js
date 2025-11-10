/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.dimcprep.com',
  generateRobotsTxt: true, // ✅ creates robots.txt
  changefreq: 'daily', // 👈 change frequency of updates
  priority: 0.7, // 👈 default priority for pages
  sitemapSize: 5000, // 👈 break into multiple sitemaps if large
  exclude: ['/admin', '/dashboard', '/api/*'], // ⛔ pages to exclude
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/dashboard', '/api'] },
    ],
    additionalSitemaps: [
      'https://www.dimcprep.com/sitemap.xml',
    ],
  },
};
