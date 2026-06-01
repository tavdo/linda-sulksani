import { NextResponse } from "next/server";
import { getUploadedFile } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const entry = await getUploadedFile(filename);
  if (!entry?.data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const contentType =
    typeof entry.metadata?.contentType === "string"
      ? entry.metadata.contentType
      : "image/jpeg";

  return new NextResponse(entry.data as ArrayBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
