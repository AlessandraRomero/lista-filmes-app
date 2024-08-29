import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const apiKey = process.env.TMDB_API_KEY;

export async function GET() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            const existingSession = await prisma.guestSession.findUnique({
                where: { guestSessionId: data.guest_session_id },
            });

            if (existingSession) {
                return NextResponse.json({ guest_session_id: data.guest_session_id });
            }
            await prisma.guestSession.create({
                data: {
                    guestSessionId: data.guest_session_id,
                },
            });

            return NextResponse.json({ guest_session_id: data.guest_session_id });
        } else {
            return NextResponse.json({ error: data.status_message }, { status: 400 });
        }
    } catch (error) {
        console.error('Failed to create guest session:', error);
        return NextResponse.json({ error: 'Error making the request' }, { status: 500 });
    }
}
