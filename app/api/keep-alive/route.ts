import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This endpoint pings the Supabase database to prevent the free-tier project
// from being paused due to inactivity (Supabase pauses after 7 days).
// Called by GitHub Actions every 4 days.

export async function GET(request: Request) {
  // Optional: verify a secret token to prevent abuse
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase credentials" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Perform a lightweight read query to keep the database active
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .limit(1);

    if (error) {
      console.error("[keep-alive] Supabase ping failed:", error.message);
      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    console.log("[keep-alive] Supabase ping successful at", new Date().toISOString());

    return NextResponse.json({
      status: "ok",
      message: "Supabase database is alive",
      rows_found: data?.length ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[keep-alive] Unexpected error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err instanceof Error ? err.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
