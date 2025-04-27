import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f5f2e9'
}

export const metadata: Metadata = {
  title: "Pooya Pirayeshakbari | Luxury Real Estate | Coming Soon",
  description: "Specializing in luxury properties and investment opportunities in the Greater Toronto Area. Exclusive high-end homes, condos, and investment properties coming soon.",
  keywords: "luxury real estate, Greater Toronto Area, high-end properties, investment opportunities, luxury homes, exclusive properties, Toronto real estate",
  generator: "Next.js",
  applicationName: "Pooya Pirayeshakbari Luxury Real Estate",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Pooya Pirayeshakbari" }],
  creator: "Pooya Pirayeshakbari",
  publisher: "Pooya Pirayeshakbari Luxury Real Estate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.pooyarealestate.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pooya Pirayeshakbari | Luxury Real Estate",
    description: "Specializing in luxury properties and investment opportunities in the Greater Toronto Area.",
    url: "https://www.pooyarealestate.com/",
    siteName: "Pooya Pirayeshakbari Luxury Real Estate",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pooya Pirayeshakbari Luxury Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooya Pirayeshakbari | Luxury Real Estate",
    description: "Specializing in luxury properties and investment opportunities in the Greater Toronto Area.",
    images: ["/images/twitter-image.jpg"],
    creator: "@pooyarealestate",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["mailto:contact@pooyarealestate.com"],
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: [{ url: '/favicon.ico' }],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest'
      }
    ]
  },
  appleWebApp: {
    title: 'Pooya',
    statusBarStyle: 'black-translucent',
    capable: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable}`}>{children}</body>
    </html>
  )
}
