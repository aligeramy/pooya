"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertySearch } from '@/components/ui/property-search';
import { PropertyResults } from '@/components/property-results';
import { PropertySearchParams, usePropertySearch } from '@/hooks/usePropertySearch';
import { ArrowUpCircle } from 'lucide-react';

// Metadata must be exported from layout.tsx, not page.tsx in Next.js App Router
// The SEO content will still be present in the page

export default function Home() {
  const { results, loading, error, totalResults, currentPage, searchProperties, setCurrentPage } = usePropertySearch();
  const [hasSearched, setHasSearched] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchValues, setSearchValues] = useState<PropertySearchParams>({});

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load initial properties
  useEffect(() => {
    const loadInitialProperties = async () => {
      const apiUrl = `/api/treb/properties?limit=10&page=1`;
      await searchProperties({}, apiUrl);
      // Don't set hasSearched to true on initial load
      // setHasSearched(true);
    };
    
    loadInitialProperties();
  }, []);

  const handleSearch = (params: PropertySearchParams) => {
    // Save search values
    setSearchValues(params);
    
    // Update the URL to use the TREB API instead of the mock IDX API
    const apiUrl = `/api/treb/properties?limit=${params.limit || 10}&page=${params.page || 1}`;
    
    // Update the searchProperties function to use the new endpoint
    searchProperties(params, apiUrl);
    setHasSearched(true);
    
    // On mobile, scroll down to show results
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const apiUrl = `/api/treb/properties?limit=10&page=${page}`;
    searchProperties({ page }, apiUrl);
    // Scroll back to the top of results
    if (window.innerWidth < 1024) {
      window.scrollTo({
        top: document.getElementById('results-section')?.offsetTop ?? 0,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="min-h-screen bg-[#f9f6f3]">
      {/* Hero Section - Shown only when not searched on desktop or always on mobile */}
      <AnimatePresence>
        {(!hasSearched || window.innerWidth < 1024) && (
          <motion.section 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className={`${hasSearched && window.innerWidth >= 1024 ? 'hidden' : 'relative h-screen flex items-center justify-center overflow-hidden'}`}
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            
            {/* Parallax Background */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src="/images/luxury-home-1.png" 
                alt="Luxury Home"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Content Container */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
              {/* Logo and Name */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center mb-12"
              >
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
                <p className="text-sm md:text-base text-white/90 font-montserrat tracking-wider">
                  LUXURY REAL ESTATE
                </p>
              </motion.div>
              
              {/* Search Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full"
              >
                <PropertySearch onSearch={handleSearch} isLoading={loading} />
              </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            {!hasSearched && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
                  opacity: { delay: 1.5, duration: 0.5 },
                  y: { repeat: Infinity, duration: 1.5 }
                }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
              >
                <svg 
                  width="24" 
                  height="36" 
                  viewBox="0 0 24 36" 
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="2" />
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="4" 
                    fill="currentColor" 
                  />
                </svg>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results Layout - Desktop Split View */}
      {hasSearched && (
        <div className="lg:grid lg:grid-cols-12 lg:min-h-screen">
          {/* Sidebar for Search - Desktop Only */}
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block lg:col-span-3 xl:col-span-3 bg-white shadow-md p-6 sticky top-0 h-screen overflow-auto"
          >
            <div className="flex items-center mb-8">
              <Image 
                src="/logo.png" 
                alt="Pooya Pirayesh Logo" 
                width={40} 
                height={60} 
                className="object-contain mr-3"
              />
              <div>
                <h2 className="text-xl font-serif text-[#3c2f1f]">Pooya Pirayesh</h2>
                <p className="text-xs tracking-wider text-gray-600">LUXURY REAL ESTATE</p>
              </div>
            </div>
            
            <PropertySearch onSearch={handleSearch} isLoading={loading} compact={true} defaultValues={searchValues} />
          </motion.aside>
          
          {/* Sticky Search Bar for Mobile - Only shows after scrolling */}
          <div 
            className={`lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
              scrollPosition > 500 ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="p-3 flex items-center">
              <Image 
                src="/logo.png" 
                alt="Pooya Pirayesh Logo" 
                width={28} 
                height={42} 
                className="object-contain mr-3"
              />
              <div className="flex-1">
                <PropertySearch onSearch={handleSearch} isLoading={loading} compact={true} />
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-9 xl:col-span-9 py-8 px-4 lg:p-8"
          >
            <div id="results-section" className="w-full max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif text-[#3c2f1f] mb-8 text-center lg:text-left">
                Featured Properties
              </h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                  {error}
                </div>
              )}
              
              <PropertyResults
                results={results}
                loading={loading}
                totalResults={totalResults}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Back to Top Button */}
      <AnimatePresence>
        {scrollPosition > 500 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-[#3c2f1f] text-white p-3 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
          >
            <ArrowUpCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
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
