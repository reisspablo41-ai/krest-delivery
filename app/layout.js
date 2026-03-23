import localFont from 'next/font/local';
import './globals.css';
import Header from './Components/Header';
import { UserContextProvider } from './Context/UserContext';
import { TimerProvider } from './Context/TimerContext';
import { Toaster } from 'sonner';
import { Inter, Kanit } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-inter',
});

// Using CSS variables to inject Google Sans Flex as the primary font,
// with Inter as a secure robust fallback if the local font fails to load.
export const metadata = {
  metadataBase: new URL('https://hussgrouptransportcourier.com'),
  title: 'Krest Delivery | Global Logistics & Secure Shipping',
  description:
    'Experience premier global logistics with Krest Delivery. We provide fast, secure shipping for packages and pets, real-time tracking, and comprehensive tools for businesses worldwide.',
  keywords: ['shipping', 'logistics', 'courier', 'Krest Delivery', 'freight', 'pet transport', 'secure shipping', 'global tracking'],
  icons: {
    icon: '/fav.png',
    apple: '/fav.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Krest Delivery | Global Logistics',
    description:
      'Fast, secure, and reliable shipping services for packages and pets. Track your shipments globally with Krest Delivery.',
    url: 'https://hussgrouptransportcourier.com',
    siteName: 'Krest Delivery',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Krest Delivery Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krest Delivery | Secure Shipping',
    description: 'Premier global logistics and real-time shipment tracking.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Organization Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Krest Delivery',
              url: 'https://hussgrouptransportcourier.com',
              logo: 'https://hussgrouptransportcourier.com/logo.png',
              sameAs: [
                'https://wwww.facebook.com/share/1E2yHUswVX/?mibextid=wwXIfr',
              ],
            }),
          }}
        />

        {/* ✅ WebSite Schema Markup (For Search Box & Sitelinks) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Krest Delivery',
              url: 'https://hussgrouptransportcourier.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://hussgrouptransportcourier.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="gLwR-ISOyVSDF9CIr6UA4OL3gWeao6kJZwPuwR2Fyqk"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-primary min-h-screen flex flex-col relative text-white`}
        style={{
          '--font-google-sans': '"Google Sans Flex", "Google Sans", var(--font-inter), sans-serif',
        }}
      >
        <TimerProvider>
          <UserContextProvider>
            <Header />
            <div>
              <main>{children}</main>
            </div>
          </UserContextProvider>
        </TimerProvider>
        <Toaster
          richColors
          position="top-right"
          toastOptions={{ duration: 4000 }}
        />
        <script src="//code.jivosite.com/widget/lIk2BuTr8B" async></script>
      </body>
    </html>
  );
}
