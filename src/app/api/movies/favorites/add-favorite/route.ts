import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { guestSessionId, movieId } = await request.json();

    if (!guestSessionId || !movieId) {
      return NextResponse.json({ error: 'guest_session_id and movieId are required' }, { status: 400 });
    }
    const guestSession = await prisma.guestSession.findUnique({
      where: { guestSessionId: String(guestSessionId) },
    });

    if (!guestSession) {
      return NextResponse.json({ error: 'Guest session does not exist' }, { status: 404 });
    }
    const existingFavorite = await prisma.favorite.findUnique({
      where: { movieId_guestSessionId: { movieId: String(movieId), guestSessionId: String(guestSessionId) } },
    });

    if (existingFavorite) {
      return NextResponse.json({ message: 'Movie is already in favorites for this session' }, { status: 400 });
    }

    await prisma.favorite.create({
      data: { movieId: String(movieId), guestSessionId: String(guestSessionId) },
    });

    return NextResponse.json({ message: 'Movie added to favorites' }, { status: 200 });
  } catch (error) {
    console.error('Error adding movie to favorite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
