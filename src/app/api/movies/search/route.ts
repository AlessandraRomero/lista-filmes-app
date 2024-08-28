import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Escreva um título para pesquisar' }, { status: 400 });
  }

  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key must be set' }, { status: 500 });
  }

  try {
    const apiKey = API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}
