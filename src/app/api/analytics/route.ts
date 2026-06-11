import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [products, orders, categories] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.category.count(),
    ]);

    return NextResponse.json({
      products,
      orders,
      categories,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
