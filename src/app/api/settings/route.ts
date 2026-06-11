import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, type } = body;

    const setting = await prisma.setting.upsert({
      where: { key },
      create: {
        key,
        value,
        type: type || 'string',
      },
      update: {
        value,
      },
    });

    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
