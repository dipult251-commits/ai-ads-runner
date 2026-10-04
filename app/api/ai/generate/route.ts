import { NextRequest, NextResponse } from 'next/server';
import { generateAdCopy } from '@/lib/ai';
import { adSchema } from '@/lib/validators';
import prisma from '@/lib/prisma';
import { getUserFromToken } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = adSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json(
        { message: payload.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { productName, language, platform, brief } = payload.data;
    const result = await generateAdCopy({ productName, language, platform, brief });

    const token = request.cookies.get('token')?.value;
    if (token) {
      const user = await getUserFromToken(token);
      if (user) {
        await prisma.ad.create({
          data: {
            userId: user.id,
            productName,
            headline: result.headline,
            description: result.description,
            caption: result.caption,
            hashtags: result.hashtags,
            language,
            platform,
          },
        });
      }
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
