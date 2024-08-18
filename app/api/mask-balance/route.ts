import { NextRequest, NextResponse } from "next/server";

const masksApiUrl = "https://app.masks.wtf/api/balance";

export async function GET(req: NextRequest) {
  console.log(`API route called at ${new Date().toISOString()}`);
  console.log(`Full URL: ${req.url}`);

  const farcasterId = req.nextUrl.searchParams.get("fid");
  console.log(`Requested farcasterId: ${farcasterId}`);

  if (!farcasterId) {
    console.log("Error: fid parameter is missing");
    return NextResponse.json(
      { error: "fid parameter is required" },
      { status: 400 }
    );
  }

  try {
    console.log(`Fetching data from Masks API for farcasterId: ${farcasterId}`);
    const response = await fetch(`${masksApiUrl}?fid=${farcasterId}`);
    if (!response.ok) {
      const errorResponse = await response.text();
      console.error(
        "Error fetching data from Masks API:",
        response.statusText,
        errorResponse
      );
      return NextResponse.json(
        { error: "Failed to fetch data from Masks API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      "Masks API response (balance data):",
      JSON.stringify(data, null, 2)
    );

    return NextResponse.json({
      balanceData: data,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
