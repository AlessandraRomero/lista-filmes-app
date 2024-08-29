import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { guestSessionId, movieId } = await request.json();

    if (!guestSessionId || !movieId) {
      return NextResponse.json({ error: 'Movie ID and Guest Session ID are required' }, { status: 400 });
    }

    const guestSession = await prisma.guestSession.findUnique({
      where: { guestSessionId: String(guestSessionId) },
    });

    if (!guestSession) {
      return NextResponse.json({ error: 'Guest session does not exist' }, { status: 404 });
    }

    const deletedFavorite = await prisma.favorite.delete({
      where: {
        movieId_guestSessionId: { movieId, guestSessionId },
      },
    });

    return NextResponse.json({ message: 'Favorite removed successfully', deletedFavorite });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as any).code === 'P2025') {
        return NextResponse.json({ error: 'Favorite not found for the given guest session' }, { status: 404 });
      }
      console.error('Error removing favorite:', error.message);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
  }
}
