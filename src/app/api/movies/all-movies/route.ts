import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key must be set' }, { status: 500 });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
    );
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const statusMessage = error.response?.data?.status_message || 'Unknown error occurred';
      console.error('Error fetching popular movies:', statusMessage);
      return NextResponse.json({ error: 'Failed to fetch popular movies', details: statusMessage }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Failed to fetch popular movies', details: 'Unexpected error occurred' }, { status: 500 });
    }
  }
}
