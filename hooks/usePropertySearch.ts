import { useState } from 'react';

export type PropertySearchParams = {
  query?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  page?: number;
  limit?: number;
};

export type PropertyListing = {
  id: string;
  mlsNumber: string;
  address: {
    streetNumber: string;
    streetName: string;
    streetSuffix: string;
    city: string;
    province: string;
    postalCode: string;
  };
  listPrice: number;
  propertyType: string;
  style: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  listingDate: string;
  description: string;
  features: string[];
};

export function usePropertySearch() {
  const [results, setResults] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchProperties = async (params: PropertySearchParams, apiUrl?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params.query) queryParams.append('query', params.query);
      if (params.city) queryParams.append('city', params.city);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
      if (params.propertyType) queryParams.append('propertyType', params.propertyType);
      if (params.bedrooms) queryParams.append('bedrooms', params.bedrooms);
      if (params.bathrooms) queryParams.append('bathrooms', params.bathrooms);
      
      const page = params.page || currentPage;
      queryParams.append('page', page.toString());
      queryParams.append('limit', (params.limit || 10).toString());
      
      // Make API request
      const url = apiUrl || `/api/idx?${queryParams.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch properties');
      }
      
      const data = await response.json();
      
      // If we're using the TREB API, we need to fetch the images for each property
      if (apiUrl && apiUrl.includes('/api/treb/properties')) {
        const listings = data.listings || [];
        
        // Fetch images for each property
        const listingsWithImages = await Promise.all(
          listings.map(async (listing: PropertyListing) => {
            try {
              const mediaResponse = await fetch(`/api/treb/media?propertyId=${listing.id}`);
              if (mediaResponse.ok) {
                const mediaData = await mediaResponse.json();
                if (mediaData.media && mediaData.media.length > 0) {
                  // Filter to remove duplicate variants of same image
                  const uniqueImages = new Map();
                  mediaData.media.forEach((media: any) => {
                    if (!media.id.includes('-')) {
                      uniqueImages.set(media.order, media.url);
                    }
                  });
                  listing.images = Array.from(uniqueImages.values());
                }
              }
              return listing;
            } catch (err) {
              console.error(`Error fetching images for property ${listing.id}:`, err);
              return listing;
            }
          })
        );
        
        setResults(listingsWithImages);
      } else {
        // Standard IDX API response handling
        setResults(data.listings || []);
      }
      
      setTotalResults(data.total || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    totalResults,
    currentPage,
    searchProperties,
    setCurrentPage
  };
} 