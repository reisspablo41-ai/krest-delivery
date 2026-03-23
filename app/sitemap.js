export default function sitemap() {
  const baseUrl = 'https://hussgrouptransportcourier.com';
  
  // Define your static routes here
  const routes = [
    '',
    '/Track',
    '/rentals',
    '/schedule-a-pickup',
    '/Faqs',
    '/ContactUs/FileClaim',
    '/ContactUs/RequestRefund',
    '/buisness/postage-prices',
    '/ship/sending-mail',
    '/ship/sending-package',
    '/receive/mail-for-deceased',
    '/dashboard/informed-delivery',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
