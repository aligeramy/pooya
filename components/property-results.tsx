import React from 'react';
import { PropertyCard } from '@/components/ui/property-card';
import { PropertyListing } from '@/hooks/usePropertySearch';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type PropertyResultsProps = {
  results: PropertyListing[];
  loading: boolean;
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function PropertyResults({
  results,
  loading,
  totalResults,
  currentPage,
  onPageChange,
}: PropertyResultsProps) {
  // Calculate total pages
  const ITEMS_PER_PAGE = 12; // This should match your backend pagination
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  // Generate page numbers for pagination
  const generatePaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are fewer than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of the middle section
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning or end
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const paginationNumbers = generatePaginationNumbers();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#3c2f1f]" />
          <p className="mt-4 text-gray-600">Finding your perfect home...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0 && !loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">No properties found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria to find more properties.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {results.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            priority={index < 6}
          />
        ))}
      </motion.div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-300"
            >
              Previous
            </Button>
            {paginationNumbers.map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
              ) : (
                <Button
                  key={`page-${page}`}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(Number(page))}
                  className={`px-3 ${
                    currentPage === page 
                      ? 'bg-[#3c2f1f] text-white hover:bg-[#4e3d2a]' 
                      : 'border-gray-300'
                  }`}
                >
                  {page}
                </Button>
              )
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-300"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-600">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalResults)} of {totalResults} properties
      </div>
    </div>
  );
} 