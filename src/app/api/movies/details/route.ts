import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('id');

  console.log('RECEIVE MOVEID:>>>', movieId); 

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key must be set' }, { status: 500 });
  }

  try {
    const apiKey = API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
    console.log('Request URL:', url); 
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:>>>', error); 
    return NextResponse.json({ error: 'Failed to fetch movie details' }, { status: 500 });
  }
}
