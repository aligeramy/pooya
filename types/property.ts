export interface PropertyResult {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    city: string;
    neighborhood?: string;
    address?: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: string;
  };
  type: 'apartment' | 'house' | 'villa' | 'land' | 'commercial';
  status: 'for-sale' | 'for-rent';
  images: string[];
  createdAt: string;
  updatedAt: string;
} 