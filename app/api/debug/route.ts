import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Check if images exist in public directory
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    
    let imageFiles: string[] = [];
    try {
      imageFiles = fs.readdirSync(imagesDir);
    } catch (err) {
      console.error('Error reading images directory:', err);
    }
    
    // Fetch a property listing to check image paths
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/idx?id=mock-1`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch property data');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      publicDirExists: fs.existsSync(publicDir),
      imagesDirExists: fs.existsSync(imagesDir),
      imageFiles: imageFiles.filter(file => !file.startsWith('.')).map(file => `/images/${file}`),
      property: data.listings?.[0] || null,
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error('Debug route error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 