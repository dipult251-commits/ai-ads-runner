import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'change-me-to-a-secure-secret-32-characters'
);

export async function getSessionFromToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.userId) return null;

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || new Date(session.expiresAt) < new Date()) {
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
}

export async function getUserFromToken(token: string) {
  try {
    const session = await getSessionFromToken(token);
    if (!session) return null;
    return session.user;
  } catch (error) {
    return null;
  }
}

export async function createSessionForUser(userId: string, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
}

export async function invalidateSession(token: string) {
  await prisma.session.delete({
    where: { token },
  }).catch(() => {
    // Session might not exist, that's fine
  });
}
