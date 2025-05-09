"use client"

import Image from 'next/image';

// Metadata must be exported from layout.tsx, not page.tsx in Next.js App Router
// The SEO content will still be present in the page

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f6f3] flex flex-col">
      {/* Under Construction Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden flex-1">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/luxury-home-1.png" 
            alt="Luxury Home"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content Container */}
        <div className="relative z-20 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Logo and Name */}
          <div className="flex flex-col items-center mb-12">
            <Image 
              src="/logo.png" 
              alt="Pooya Pirayesh Logo" 
              width={60} 
              height={90} 
              className="object-contain mb-4"
              priority
            />
            <h1 className="text-4xl md:text-6xl font-serif text-white text-center mb-2">
              Pooya Pirayesh
            </h1>
            <p className="text-sm md:text-base text-white/90 font-montserrat tracking-wider mb-8">
              LUXURY REAL ESTATE
            </p>
          </div>
          
          {/* Under Construction Message */}
          <div className="w-full">
            <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg border border-white/30 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-4">
                Under Construction
              </h2>
              <p className="text-lg text-white text-center mb-4">
                Our website is currently being renovated to serve you better.
              </p>
              <p className="text-md text-white text-center">
                We will be back soon. Thank you for your patience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#3c2f1f] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Image 
                src="/logo-white.png" 
                alt="Pooya Pirayesh Logo" 
                width={40} 
                height={60} 
                className="object-contain mr-3"
              />
              <div>
                <h3 className="text-xl font-serif">Pooya Pirayesh</h3>
                <p className="text-xs tracking-wider text-gray-300">LUXURY REAL ESTATE</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-300">
              <p>© {new Date().getFullYear()} Pooya Pirayesh. All rights reserved.</p>
              <p className="mt-1">Royal LePage Your Community Realty, Brokerage</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
