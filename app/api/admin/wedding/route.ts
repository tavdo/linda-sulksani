import { NextResponse } from "next/server";
import type { WeddingData } from "@/types";
import { isAdminAuthenticated } from "@/lib/auth";
import { getWeddingData, saveWeddingData } from "@/lib/data-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "არაავტორიზებული" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getWeddingData());
  } catch (err) {
    console.error("Failed to load wedding data", err);
    const message =
      err instanceof Error ? `${err.name}: ${err.message}` : "Unknown error";
    // Keep response generic for users, but include a short debug string.
    return NextResponse.json(
      { error: "სერვერის შეცდომა", debug: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "არაავტორიზებული" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as WeddingData;
    const saved = await saveWeddingData(body);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "შენახვა ვერ მოხერხდა" }, { status: 500 });
  }
}
