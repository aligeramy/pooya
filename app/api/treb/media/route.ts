import { NextRequest, NextResponse } from 'next/server';

const TREB_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvODQ0OSIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzQ1NzcxMjcyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI4NDQ5IiwianRpIjoiNzY4MGQzNzliNzNiMGJlNiIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.S-n-dwF7T2rL5ebVFmu89wD1R3QtkgDTJZYtJV0mkq4";
const API_BASE_URL = "https://query.ampre.ca/odata";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const propertyId = searchParams.get('propertyId');
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Query for media related to this property
    const url = `${API_BASE_URL}/Media?$filter=ResourceRecordKey eq '${propertyId}' and ResourceName eq 'Property'&$orderby=Order&$format=json`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TREB_API_TOKEN}`,
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract and process media URLs
    const media = data.value?.map((item: any) => ({
      id: item.MediaKey,
      url: item.MediaURL,
      type: item.MediaType,
      order: item.Order || 0,
      description: item.ShortDescription || '',
      isPreferred: item.PreferredPhotoYN || false
    })) || [];
    
    // Sort by order and preferred status
    media.sort((a: any, b: any) => {
      if (a.isPreferred && !b.isPreferred) return -1;
      if (!a.isPreferred && b.isPreferred) return 1;
      return a.order - b.order;
    });

    return NextResponse.json({
      media,
      propertyId,
      total: media.length
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch media' },
      { status: 500 }
    );
  }
} 