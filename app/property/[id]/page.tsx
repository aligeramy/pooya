"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PropertyListing } from '@/hooks/usePropertySearch';
import { 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  Share2 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export default function PropertyDetail({ params }: { params: { id: string }}) {
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // First fetch property details
        const propertyRes = await fetch(`/api/treb/properties?id=${params.id}`);
        
        if (!propertyRes.ok) {
          throw new Error('Failed to fetch property');
        }
        
        const propertyData = await propertyRes.json();
        
        if (propertyData.listings && propertyData.listings.length > 0) {
          const propertyDetails = propertyData.listings[0];
          
          // Then fetch media for this property
          const mediaRes = await fetch(`/api/treb/media?propertyId=${params.id}`);
          
          if (mediaRes.ok) {
            const mediaData = await mediaRes.json();
            
            // Add media URLs to the property
            if (mediaData.media && mediaData.media.length > 0) {
              propertyDetails.images = mediaData.media.map((item: any) => item.url);
            }
          }
          
          setProperty(propertyDetails);
        } else {
          throw new Error('Property not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f6f3]">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-[#3c2f1f] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f6f3] p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full text-center">
          <h1 className="text-2xl font-serif text-[#3c2f1f] mb-4">
            {error || 'Property not found'}
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the property you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          <Link href="/">
            <Button className="bg-[#3c2f1f] hover:bg-[#564636]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { 
    mlsNumber, 
    address, 
    listPrice, 
    propertyType, 
    bedrooms, 
    bathrooms, 
    images = [],
    description,
    features = [],
    listingDate 
  } = property;

  const formattedDate = new Date(listingDate).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const fullAddress = `${address.streetNumber} ${address.streetName} ${address.streetSuffix || ''}, ${address.city}, ${address.province}`;

  // Ensure we have at least one image
  const propertyImages = images.length > 0 
    ? images.map(img => img.startsWith('/') ? img : `/${img}`)
    : ['/images/property-placeholder.jpg'];

  return (
    <div className="min-h-screen bg-[#f9f6f3]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation and MLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <Link href="/" className="inline-flex items-center text-[#3c2f1f] hover:text-[#564636] font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Listings
            </Link>
          </div>
          <div className="mt-2 sm:mt-0">
            <Badge className="bg-[#3c2f1f]">MLS# {mlsNumber}</Badge>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]"
            >
              <Image
                src={propertyImages[activeImageIndex]}
                alt={fullAddress}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              />
            </motion.div>

            {/* Thumbnail gallery */}
            {propertyImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {propertyImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative rounded-md overflow-hidden aspect-video ${
                      index === activeImageIndex 
                        ? 'ring-4 ring-[#3c2f1f] ring-opacity-50' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Property view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Property details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-serif text-[#3c2f1f] mb-2">
                {fullAddress}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                <span>{address.city}, {address.province}</span>
                {address.postalCode && (
                  <span className="ml-1">- {address.postalCode}</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 mb-8">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-[#3c2f1f]" />
                  <div>
                    <p className="font-medium">{bedrooms}</p>
                    <p className="text-xs text-gray-500">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-[#3c2f1f]" />
                  <div>
                    <p className="font-medium">{bathrooms}</p>
                    <p className="text-xs text-gray-500">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-[#3c2f1f]" />
                  <div>
                    <p className="font-medium capitalize">{propertyType}</p>
                    <p className="text-xs text-gray-500">Property Type</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#3c2f1f]" />
                  <div>
                    <p className="font-medium">{formattedDate}</p>
                    <p className="text-xs text-gray-500">Listed Date</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-6 my-6">
                <h2 className="text-xl font-serif text-[#3c2f1f] mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{description}</p>
              </div>

              {features.length > 0 && (
                <div className="py-6">
                  <h2 className="text-xl font-serif text-[#3c2f1f] mb-4">Features & Amenities</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2 text-[#3c2f1f]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Price and Contact */}
          <div>
            <div className="sticky top-6 space-y-6">
              {/* Price card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-3xl font-serif text-[#3c2f1f] mb-4">
                  {formatPrice(listPrice)}
                </h2>
                
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-[#3c2f1f] hover:bg-[#564636]">
                    <Phone className="mr-2 h-4 w-4" /> 
                    Call
                  </Button>
                  <Button className="flex-1 bg-[#3c2f1f] hover:bg-[#564636]">
                    <Mail className="mr-2 h-4 w-4" /> 
                    Email
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Agent card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/pooya.png"
                      alt="Pooya Pirayesh"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#3c2f1f]">Pooya Pirayesh</h3>
                    <p className="text-sm text-gray-600">Luxury Real Estate Specialist</p>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-700">
                  <p className="mb-2">Royal LePage Your Community Realty, Brokerage</p>
                  <p>Contact me for more information about this property or to schedule a viewing.</p>
                </div>
                
                <Button className="w-full mt-4 bg-[#3c2f1f] hover:bg-[#564636]">
                  Contact Agent
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3c2f1f] text-white py-8 mt-16">
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
    </div>
  );
} 