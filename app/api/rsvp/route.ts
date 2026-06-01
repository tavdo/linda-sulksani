import { NextResponse } from "next/server";
import type { RSVPFormData } from "@/types";
import { addRSVP } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RSVPFormData;

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json({ error: "სახელი და ელფოსტა აუცილებელია" }, { status: 400 });
    }

    const record = await addRSVP({
      name: body.name.trim(),
      email: body.email.trim(),
      guestCount: Math.min(10, Math.max(1, body.guestCount || 1)),
      attending: body.attending || "yes",
      dietaryPreferences: body.dietaryPreferences?.trim() || "",
      message: body.message?.trim() || "",
    });

    return NextResponse.json({ success: true, id: record.id });
  } catch {
    return NextResponse.json({ error: "შეცდომა მოხდა" }, { status: 500 });
  }
}
