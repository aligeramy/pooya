"use client"

import Script from "next/script"

// Metadata must be exported from layout.tsx, not page.tsx in Next.js App Router
// The SEO content will still be present in the page

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Pooya Pirayeshakbari Luxury Real Estate",
            "image": "https://www.pooyarealestate.com/images/pooya.png",
            "description": "Specializing in luxury properties and investment opportunities in the Greater Toronto Area.",
            "url": "https://www.pooyarealestate.com",
            "telephone": "+1-416-555-1234",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Luxury Avenue",
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "postalCode": "M5V 2K4",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.6532,
              "longitude": -79.3832
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "17:00"
            },
            "sameAs": [
              "https://www.facebook.com/pooyarealestate",
              "https://www.instagram.com/pooyarealestate",
              "https://www.linkedin.com/in/pooyarealestate"
            ]
          })
        }}
      />
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f2e9] text-[#3c2f1f]">
        <div className="text-center p-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Pooya Pirayesh</h1>
          <p className="text-md mb-8 font-montserrat font-medium tracking-widest">WE WILL BE BACK SHORTLY</p>
          
          {/* Hidden SEO content that will be crawled but not visible to users */}
          <div className="hidden">
            <h3>Luxury Real Estate in the Greater Toronto Area</h3>
            <p>
              Welcome to Pooya Pirayeshakbari Luxury Real Estate, your premier destination for 
              high-end properties and exclusive investment opportunities in the Greater Toronto Area.
            </p>
            <h4>Our Specializations</h4>
            <ul>
              <li>Luxury Homes and Estates</li>
              <li>High-End Condominiums</li>
              <li>Investment Properties</li>
              <li>Commercial Real Estate</li>
              <li>International Property Investments</li>
            </ul>
            <h4>Areas We Serve</h4>
            <p>
              We provide exceptional real estate services throughout the Greater Toronto Area, including
              Yorkville, Forest Hill, Rosedale, The Bridle Path, Lawrence Park, Hoggs Hollow, and more.
            </p>
            <h4>Why Choose Us</h4>
            <p>
              With years of experience in the luxury real estate market, we offer personalized service,
              in-depth market knowledge, exclusive access to off-market properties, and a commitment to 
              excellence in every transaction.
            </p>
            <h4>Contact Information</h4>
            <address>
              123 Luxury Avenue, Toronto, ON M5V 2K4<br />
              Phone: (416) 555-1234<br />
              Email: info@pooyarealestate.com
            </address>
          </div>
        </div>
      </main>
    </>
  )
}
