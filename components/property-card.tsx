import Image from 'next/image';
import Link from 'next/link';
import { PropertyResult } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: PropertyResult;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link 
      href={`/properties/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={property.images[0] || '/images/property-placeholder.jpg'} 
          alt={property.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 z-10">
          <Badge 
            variant={property.status === 'for-sale' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
          </Badge>
        </div>
        <div className="absolute right-2 top-2 z-10">
          <Badge variant="outline" className="bg-white/80 text-xs">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-medium">{property.title}</h3>
        
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {property.location.city}
          {property.location.neighborhood && `, ${property.location.neighborhood}`}
        </p>
        
        <div className="mt-auto">
          <div className="mt-2 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium">{property.features.bedrooms}</span>
              <span className="text-muted-foreground">Beds</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="font-medium">{property.features.bathrooms}</span>
              <span className="text-muted-foreground">Baths</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="font-medium">{property.features.area}</span>
              <span className="text-muted-foreground">{property.features.areaUnit}</span>
            </div>
          </div>
          
          <p className="mt-4 font-semibold">
            {formatPrice(property.price, property.currency)}
          </p>
        </div>
      </div>
    </Link>
  );
} 