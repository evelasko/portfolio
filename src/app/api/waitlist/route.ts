import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/waitlist
 * Proxy endpoint that forwards waitlist subscription requests to CENIE API
 * This avoids CORS issues by making the request server-side
 */
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();

    // Forward the request to CENIE API
    const response = await fetch("https://cenie.org/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Get the response data
    const data = await response.json();

    // Return the response with the same status code
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Waitlist proxy error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process waitlist subscription",
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

