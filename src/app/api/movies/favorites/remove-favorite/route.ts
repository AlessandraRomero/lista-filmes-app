import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { movieId } = await request.json();

    if (!movieId || typeof movieId !== 'string') {
      return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
    }

    const deletedFavorite = await prisma.favorite.delete({
      where: { movieId },
    });

    return NextResponse.json({ message: 'Favorite removed successfully', deletedFavorite });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
