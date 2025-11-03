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

    // Validate request body
    if (!body.full_name || !body.email) {
      return NextResponse.json(
        {
          error: "Validation error",
          message: "full_name and email are required",
        },
        { status: 400 }
      );
    }

    console.log("Requesting to CENIE API");
    console.log("body", body);
    // Try both with and without trailing slash
    const urls = [
      "https://cenie.org/api/waitlist",
      "https://cenie.org/api/waitlist/",
    ];

    let response: Response | null = null;
    let lastError: Error | null = null;

    // Try each URL until one works
    for (const url of urls) {
      try {
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.assign({}, body, { source: "evelas" })),
        });

        // If successful or client error (4xx), use this response
        if (response.status < 300 || response.status >= 400) {
          break;
        }

        // If redirect (3xx), continue to next URL or follow redirect
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get("location");
          if (location) {
            // Resolve relative URLs to absolute
            const redirectUrl = location.startsWith("http")
              ? location
              : `https://cenie.org${location.startsWith("/") ? location : `/${location}`}`;

            response = await fetch(redirectUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                Object.assign({}, body, { source: "evelas" })
              ),
            });
            break;
          }
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        continue; // Try next URL
      }
    }

    if (!response) {
      throw lastError || new Error("Failed to connect to CENIE API");
    }

    // Get the response text first to handle non-JSON responses
    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      // If response is not JSON, return the text with error info
      return NextResponse.json(
        {
          error: "Invalid response",
          message: responseText || "Received non-JSON response from CENIE API",
          status: response.status,
        },
        { status: response.status || 500 }
      );
    }

    // Return the response with the same status code
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error("Waitlist proxy error:", error);

    // Provide more detailed error information
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        error: "Internal server error",
        message: `Failed to process waitlist subscription: ${errorMessage}`,
        details:
          process.env.NODE_ENV === "development" ? errorStack : undefined,
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
