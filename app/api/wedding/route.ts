import { NextResponse } from "next/server";
import { getWeddingData } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getWeddingData();
  return NextResponse.json(data);
}
