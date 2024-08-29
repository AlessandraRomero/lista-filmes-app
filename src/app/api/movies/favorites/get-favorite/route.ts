import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const guestSessionId = url.searchParams.get('guestSessionId');

    if (!guestSessionId) {
      return NextResponse.json({ error: 'Guest Session ID is required' }, { status: 400 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { guestSessionId: String(guestSessionId) },
      select: {
        movieId: true,
      },
    });

    return NextResponse.json(favorites);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching favorites:', error.message);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
  }
}
