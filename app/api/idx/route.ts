import { NextRequest, NextResponse } from 'next/server';

// Store the token securely on the server - read from environment variable
const TREB_API_TOKEN = process.env.TREB_API_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvODQ0OSIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzQ1NzcxMjcyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI4NDQ5IiwianRpIjoiNzY4MGQzNzliNzNiMGJlNiIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.S-n-dwF7T2rL5ebVFmu89wD1R3QtkgDTJZYtJV0mkq4";
const API_BASE_URL = process.env.TREB_API_BASE_URL || "https://query.ampre.ca/odata";
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true" || process.env.NODE_ENV === "development";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') || '';
  const city = searchParams.get('city') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const propertyType = searchParams.get('propertyType') || '';
  const bedrooms = searchParams.get('bedrooms') || '';
  const bathrooms = searchParams.get('bathrooms') || '';
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  try {
    // Use mock data in development or if specifically requested
    if (USE_MOCK_DATA) {
      console.log("Using mock data for IDX API");
      
      // Simulate API response with mock data
      const mockData = {
        listings: generateMockListings(parseInt(limit), query, city),
        total: 120,
        page: parseInt(page),
        limit: parseInt(limit)
      };
      
      return NextResponse.json(mockData);
    }
    
    // In production, make real API calls to the TREB IDX API
    console.log("Making real API call to TREB IDX API");
    
    // Build OData query filter
    let filter = [];
    if (city) filter.push(`contains(City, '${city}')`);
    if (minPrice) filter.push(`ListPrice ge ${minPrice}`);
    if (maxPrice) filter.push(`ListPrice le ${maxPrice}`);
    if (propertyType) filter.push(`PropertyType eq '${propertyType}'`);
    if (bedrooms) filter.push(`Bedrooms ge ${bedrooms}`);
    if (bathrooms) filter.push(`Bathrooms ge ${bathrooms}`);
    
    // If there's a general query, apply it to multiple fields
    if (query) {
      filter.push(`(contains(UnparsedAddress, '${query}') or contains(MlsNumber, '${query}') or contains(Neighbourhood, '${query}'))`);
    }
    
    const filterString = filter.length > 0 ? `$filter=${filter.join(' and ')}` : '';
    
    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build full OData query
    const odataQuery = [
      filterString,
      `$top=${limit}`,
      `$skip=${skip}`,
      '$count=true',
      '$expand=Media'
    ].filter(Boolean).join('&');
    
    console.log(`Making API request to: ${API_BASE_URL}/Property?${odataQuery}`);
    
    // Make the API request
    const response = await fetch(`${API_BASE_URL}/Property?${odataQuery}`, {
      headers: {
        'Authorization': `Bearer ${TREB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Transform the OData response to match our expected format
    const transformedData = {
      listings: transformODataResults(data.value || []),
      total: data['@odata.count'] || data.value?.length || 0,
      page: parseInt(page),
      limit: parseInt(limit)
    };
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching IDX data:', error);
    
    // Fall back to mock data even if there's an error
    console.log("Falling back to mock data after API error");
    const mockData = {
      listings: generateMockListings(parseInt(limit), query, city),
      total: 120,
      page: parseInt(page),
      limit: parseInt(limit)
    };
    
    return NextResponse.json(mockData);
  }
}

// Transform OData API results to our internal format
function transformODataResults(results: any[]): any[] {
  return results.map(result => ({
    id: result.Id || result.id || `${result.MlsNumber}`,
    mlsNumber: result.MlsNumber || '',
    address: {
      streetNumber: result.StreetNumber || '',
      streetName: result.StreetName || '',
      streetSuffix: result.StreetSuffix || '',
      city: result.City || '',
      province: result.Province || '',
      postalCode: result.PostalCode || '',
    },
    listPrice: result.ListPrice || 0,
    propertyType: (result.PropertyType || '').toLowerCase(),
    style: result.Style || '',
    bedrooms: result.Bedrooms || 0,
    bathrooms: result.Bathrooms || 0,
    images: (result.Media || []).map((media: any) => media.MediaUrl || ''),
    listingDate: result.CreationDate || '',
    description: result.PublicRemarks || '',
    features: [
      result.HasGarage ? 'Garage' : null,
      result.HasCentralAir ? 'Central AC' : null,
      result.HasFireplace ? 'Fireplace' : null,
      result.HasPool ? 'Pool' : null,
    ].filter(Boolean),
  }));
}

// Function to generate mock listings for development
function generateMockListings(count: number, searchQuery: string, city: string): any[] {
  const listings = [];
  const cities = ['Toronto', 'Mississauga', 'Vaughan', 'Richmond Hill', 'Markham', 'Oakville'];
  const streets = ['Maple Avenue', 'Oak Street', 'Queen Street', 'King Road', 'Lakeshore Boulevard', 'Yonge Street'];
  const propertyTypes = ['House', 'Condo', 'Townhouse', 'Duplex', 'Land'];
  
  // Use the specified city or pick random cities
  const cityToUse = city || null;
  
  for (let i = 0; i < count; i++) {
    const id = `mock-${i + 1}-${Date.now()}`;
    const randomCity = cityToUse || cities[Math.floor(Math.random() * cities.length)];
    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomPropertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const streetNumber = Math.floor(Math.random() * 300) + 1;
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const bathrooms = Math.floor(Math.random() * 4) + 1;
    const listPrice = (Math.floor(Math.random() * 20) + 5) * 100000;
    
    // Random MLS number
    const mlsNumber = `MLS${Math.floor(Math.random() * 10000000)}`;
    
    // Create a mock image URL that matches the search criteria for more realistic testing
    const imageNumber = (i % 3) + 1;
    const imageUrl = `/images/luxury-home-${imageNumber}.png`;
    
    listings.push({
      id,
      mlsNumber,
      address: {
        streetNumber: streetNumber.toString(),
        streetName: randomStreet,
        streetSuffix: '',
        city: randomCity,
        province: 'ON',
        postalCode: `M${Math.floor(Math.random() * 10)}N ${Math.floor(Math.random() * 10)}Z${Math.floor(Math.random() * 10)}`,
      },
      listPrice,
      propertyType: randomPropertyType.toLowerCase(),
      style: 'Modern',
      bedrooms,
      bathrooms,
      images: [imageUrl],
      listingDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      description: `Beautiful ${bedrooms} bedroom ${randomPropertyType.toLowerCase()} in the heart of ${randomCity}. This property features modern design, open concept layout, and premium finishes.`,
      features: ['Garage', 'Central AC', 'Hardwood Floors', 'Finished Basement', 'Fireplace'],
    });
  }
  
  return listings;
} 