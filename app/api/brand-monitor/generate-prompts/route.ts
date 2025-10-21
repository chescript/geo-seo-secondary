import { NextRequest, NextResponse } from "next/server";
import { generatePromptsForCompany } from "@/lib/ai-utils";
import { Company } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  console.log('\n🎯 [GENERATE-PROMPTS API] ========================================');
  console.log('🎯 [GENERATE-PROMPTS API] Request received');

  try {
    const { company, competitors } = await request.json();

    console.log('📋 [GENERATE-PROMPTS API] Input:', {
      companyName: company?.name,
      industry: company?.industry,
      competitorCount: competitors?.length || 0
    });

    if (!company || !company.name) {
      console.error('❌ [GENERATE-PROMPTS API] Missing company data');
      return NextResponse.json(
        { error: "Company data is required" },
        { status: 400 }
      );
    }

    // Generate prompts using AI
    console.log('🤖 [GENERATE-PROMPTS API] Calling generatePromptsForCompany...');
    const prompts = await generatePromptsForCompany(
      company as Company,
      competitors || []
    );

    console.log('✅ [GENERATE-PROMPTS API] Prompts generated:', {
      count: prompts.length,
      prompts: prompts.map(p => p.prompt)
    });
    console.log('🎯 [GENERATE-PROMPTS API] ========================================\n');

    return NextResponse.json({ prompts });
  } catch (error) {
    console.error('❌ [GENERATE-PROMPTS API] Error:', error);
    console.log('🎯 [GENERATE-PROMPTS API] ========================================\n');

    return NextResponse.json(
      { error: "Failed to generate prompts", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
