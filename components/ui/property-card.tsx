import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Home, Calendar } from 'lucide-react';
import { PropertyListing } from '@/hooks/usePropertySearch';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type PropertyCardProps = {
  property: PropertyListing;
  priority?: boolean;
};

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const {
    id,
    mlsNumber,
    address,
    listPrice,
    bedrooms,
    bathrooms,
    images,
    propertyType,
    listingDate,
    features
  } = property;

  const fullAddress = `${address.streetNumber} ${address.streetName} ${address.streetSuffix || ''}, ${address.city}, ${address.province}`;
  
  // Format listing date
  const formattedDate = new Date(listingDate).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Use placeholder image if the property image is not available
  const imageSrc = (images && images.length > 0 && images[0])
    ? images[0]  // TREB URLs are already absolute, no need to add prefix
    : `/images/property-placeholder.jpg`;

  return (
    <Link href={`/property/${id}`} passHref>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group h-full overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageSrc}
            alt={fullAddress}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#3c2f1f] text-white px-3 py-1 rounded-md text-sm font-medium">
            MLS# {mlsNumber}
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/80 text-xs font-medium capitalize">
              {propertyType}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white text-xl font-semibold truncate">{formatPrice(listPrice)}</h3>
          </div>
        </div>
        
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div className="flex items-start gap-1">
            <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
            <h3 className="text-gray-800 font-medium line-clamp-2">{fullAddress}</h3>
          </div>
          
          <div className="flex items-center text-gray-600 space-x-4 text-sm pt-1">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-gray-500" />
              <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-gray-500" />
              <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          </div>
          
          {features && features.length > 0 && (
            <div className="mt-auto pt-2">
              <div className="flex flex-wrap gap-2">
                {features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                    {feature}
                  </Badge>
                ))}
                {features.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100">
                    +{features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center text-xs text-gray-500 mt-auto pt-2">
            <Calendar className="h-3 w-3 mr-1" />
            Listed on {formattedDate}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 