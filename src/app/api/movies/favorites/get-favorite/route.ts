import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const favorites = await prisma.favorite.findMany({
      select: {
        movieId: true,
      },
    });

    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
