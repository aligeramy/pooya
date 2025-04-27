import { NextRequest, NextResponse } from 'next/server';

const TREB_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvODQ0OSIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzQ1NzcxMjcyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI4NDQ5IiwianRpIjoiNzY4MGQzNzliNzNiMGJlNiIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.S-n-dwF7T2rL5ebVFmu89wD1R3QtkgDTJZYtJV0mkq4";
const API_BASE_URL = "https://query.ampre.ca/odata";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const limit = searchParams.get('limit') || '10';
    const page = searchParams.get('page') || '1';
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let url = `${API_BASE_URL}/Property?$top=${limit}&$skip=${skip}&$format=json`;
    
    // If an ID is provided, modify the URL to get a specific property
    if (id) {
      url = `${API_BASE_URL}/Property('${id}')?$format=json`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TREB_API_TOKEN}`,
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the response to match our existing PropertyListing format
    let listings = [];
    
    if (id && data) {
      // Single property response
      listings = [transformProperty(data)];
    } else if (data.value) {
      // Multiple properties response
      listings = data.value.map(transformProperty);
    }

    return NextResponse.json({
      listings,
      total: data['@odata.count'] || listings.length,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// Transform TREB property data to our PropertyListing format
function transformProperty(property: any) {
  return {
    id: property.ListingKey,
    mlsNumber: property.ListingKey,
    address: {
      streetNumber: property.StreetNumber || '',
      streetName: property.StreetName || '',
      streetSuffix: property.StreetSuffix || '',
      city: property.City || '',
      province: property.StateOrProvince || '',
      postalCode: property.PostalCode || ''
    },
    listPrice: property.ListPrice,
    propertyType: property.PropertySubType?.toLowerCase() || 'unknown',
    style: property.ArchitecturalStyle?.join(', ') || 'Modern',
    bedrooms: property.BedroomsTotal || 0,
    bathrooms: property.BathroomsTotalInteger || 0,
    images: [], // Images will be fetched separately
    listingDate: property.ListingContractDate || new Date().toISOString(),
    description: property.PublicRemarks || '',
    features: [
      ...(property.InteriorFeatures || []),
      ...(property.ExteriorFeatures || []),
      ...(property.PropertyFeatures || [])
    ].filter(Boolean),
  };
} 