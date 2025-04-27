import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, ChevronDown, Bed, Bath, DollarSign } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export type PropertySearchProps = {
  onSearch: (params: {
    query: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: string;
    bedrooms?: string;
    bathrooms?: string;
  }) => void;
  isLoading?: boolean;
  compact?: boolean;
};

export function PropertySearch({ onSearch, isLoading, compact = false }: PropertySearchProps) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query,
      city,
      minPrice,
      maxPrice,
      propertyType,
      bedrooms,
      bathrooms
    });
  };

  const priceOptions = [
    { value: '500000', label: '$500,000' },
    { value: '750000', label: '$750,000' },
    { value: '1000000', label: '$1,000,000' },
    { value: '1500000', label: '$1,500,000' },
    { value: '2000000', label: '$2,000,000' },
    { value: '3000000', label: '$3,000,000' },
    { value: '5000000', label: '$5,000,000' },
    { value: '10000000', label: '$10,000,000' },
  ];

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'multiplex', label: 'Multiplex' },
    { value: 'land', label: 'Land' },
  ];

  const bedroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const cities = [
    'Toronto',
    'Mississauga',
    'Vaughan',
    'Richmond Hill',
    'Markham',
    'Oakville',
    'Burlington',
    'Milton',
    'Brampton',
  ];

  const containerClass = compact 
    ? "w-full bg-white/95 backdrop-blur-md rounded-lg shadow-sm p-4"
    : "w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={containerClass}
    >
      <form onSubmit={handleSearch}>
        <div className={`flex ${compact ? 'flex-col' : 'flex-col md:flex-row'} space-y-3 ${compact ? '' : 'md:space-y-0 md:space-x-4'}`}>
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search by address, neighborhood, or MLS#"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent text-gray-900"
            />
          </div>

          <div className={compact ? "w-full" : "w-full md:w-48"}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-11 justify-between bg-white/80 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 truncate">
                      {city || 'City'}
                    </span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 max-h-80 overflow-auto">
                <div className="grid grid-cols-1 gap-1 p-1">
                  {cities.map((cityName) => (
                    <Button
                      key={cityName}
                      variant="ghost"
                      className="justify-start font-normal text-gray-700"
                      onClick={() => setCity(cityName)}
                    >
                      {cityName}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <Button 
            type="submit" 
            className="h-11 px-6 bg-[#3c2f1f] hover:bg-[#564636] text-white font-medium rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {!compact && (
          <div className="flex items-center justify-center mt-4">
            <Button
              type="button"
              variant="ghost"
              className="text-[#3c2f1f] hover:text-[#564636] flex items-center text-sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  showAdvanced ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>
        )}

        {showAdvanced && !compact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Home className="mr-2 h-4 w-4" /> Property Type
              </label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-white/80 border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-transparent rounded-lg">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-type">Any Type</SelectItem>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Bed className="mr-2 h-4 w-4" /> Bedrooms
              </label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="bg-white/80 border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-transparent rounded-lg">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-bed">Any</SelectItem>
                  {bedroomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Bath className="mr-2 h-4 w-4" /> Bathrooms
              </label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger className="bg-white/80 border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-transparent rounded-lg">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-bath">Any</SelectItem>
                  {bathroomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign className="mr-2 h-4 w-4" /> Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={minPrice} onValueChange={setMinPrice}>
                  <SelectTrigger className="bg-white/80 border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-transparent rounded-lg">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-min">No Min</SelectItem>
                    {priceOptions.slice(0, -1).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger className="bg-white/80 border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-transparent rounded-lg">
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-max">No Max</SelectItem>
                    {priceOptions.slice(1).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
} 