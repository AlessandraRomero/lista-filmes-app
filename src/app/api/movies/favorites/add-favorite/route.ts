import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { movieId } = await request.json();

    if (!movieId) {
      return NextResponse.json({ error: 'movieId is required' }, { status: 400 });
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: { movieId: String(movieId) },
    });

    if (existingFavorite) {
      return NextResponse.json({ message: 'Movie is already in favorites' }, { status: 400 });
    }

    await prisma.favorite.create({
      data: { movieId: String(movieId) },
    });

    return NextResponse.json({ message: 'Movie added to favorites' }, { status: 200 });
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
