import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { brandAnalyses } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'json';

    // Fetch all user's analyses
    const analyses = await db.query.brandAnalyses.findMany({
      where: eq(brandAnalyses.userId, sessionResponse.user.id),
      orderBy: desc(brandAnalyses.createdAt),
    });

    if (format === 'csv') {
      // Generate CSV
      const csvRows = [
        // Header
        'ID,Company Name,URL,Industry,Credits Used,Created At',
        // Data rows
        ...analyses.map((analysis) => {
          const createdAt = analysis.createdAt instanceof Date
            ? analysis.createdAt.toISOString()
            : new Date(String(analysis.createdAt)).toISOString();
          return [
            analysis.id,
            `"${analysis.companyName}"`,
            `"${analysis.url}"`,
            `"${analysis.industry || ''}"`,
            analysis.creditsUsed,
            createdAt,
          ].join(',');
        }),
      ];

      const csv = csvRows.join('\n');
      const filename = `brand-analyses-${new Date().toISOString().split('T')[0]}.csv`;

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Default: JSON format
    const filename = `brand-analyses-${new Date().toISOString().split('T')[0]}.json`;
    const jsonData = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        totalAnalyses: analyses.length,
        analyses: analyses.map((analysis) => ({
          id: analysis.id,
          companyName: analysis.companyName,
          url: analysis.url,
          industry: analysis.industry,
          creditsUsed: analysis.creditsUsed,
          createdAt: analysis.createdAt,
          analysisData: analysis.analysisData,
          competitors: analysis.competitors,
          prompts: analysis.prompts,
        })),
      },
      null,
      2
    );

    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting analyses:', error);
    return NextResponse.json(
      { error: 'Failed to export analyses' },
      { status: 500 }
    );
  }
}
