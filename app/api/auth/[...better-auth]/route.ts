import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { NextRequest, NextResponse } from 'next/server';

const handlers = toNextJsHandler(auth);

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

// Handle OPTIONS requests (preflight)
export async function OPTIONS(req: NextRequest) {
  console.log('🔐 [AUTH API] OPTIONS (preflight) request');
  return NextResponse.json({}, { headers: corsHeaders });
}

// Wrap GET with logging
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  console.log('🔐 [AUTH API] GET request:', url.pathname);
  console.log('🔐 [AUTH API] Query params:', Object.fromEntries(url.searchParams));

  try {
    const response = await handlers.GET(req);
    console.log('✅ [AUTH API] GET response status:', response.status);

    // Add CORS headers to response
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error: any) {
    console.error('❌ [AUTH API] GET error:', error);
    throw error;
  }
}

// Wrap POST with logging
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  console.log('🔐 [AUTH API] POST request:', url.pathname);

  // Clone request to read body without consuming it
  const clonedReq = req.clone();
  try {
    const body = await clonedReq.json();
    console.log('🔐 [AUTH API] Request body keys:', Object.keys(body));
    // Don't log password
    const safeBody = { ...body };
    if (safeBody.password) safeBody.password = '***';
    console.log('🔐 [AUTH API] Request data:', safeBody);
  } catch (e) {
    console.log('🔐 [AUTH API] Could not parse body');
  }

  try {
    const response = await handlers.POST(req);
    console.log('✅ [AUTH API] POST response status:', response.status);

    // Try to log response data
    const clonedResponse = response.clone();
    try {
      const responseData = await clonedResponse.json();
      console.log('🔐 [AUTH API] Response data:', responseData);
    } catch (e) {
      console.log('🔐 [AUTH API] Response is not JSON');
    }

    // Add CORS headers to response
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error: any) {
    console.error('❌ [AUTH API] POST error:', error);
    console.error('❌ [AUTH API] Error message:', error.message);
    console.error('❌ [AUTH API] Error stack:', error.stack);
    throw error;
  }
}