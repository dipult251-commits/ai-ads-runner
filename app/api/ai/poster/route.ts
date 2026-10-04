import { NextRequest, NextResponse } from 'next/server';
import { generatePosterConcept } from '@/lib/ai';
import { posterSchema } from '@/lib/validators';
import prisma from '@/lib/prisma';
import { getUserFromToken } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = posterSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json(
        { message: payload.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { title, theme, layout } = payload.data;
    const result = await generatePosterConcept({ title, theme, layout });

    const token = request.cookies.get('token')?.value;
    if (token) {
      const user = await getUserFromToken(token);
      if (user) {
        await prisma.poster.create({
          data: {
            userId: user.id,
            title,
            theme,
            layout,
            prompt: result.prompt,
          },
        });
      }
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Poster generation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
