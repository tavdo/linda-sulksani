import { promises as fs } from "fs";
import path from "path";
import type { AdminStats, RSVPRecord, WeddingData } from "@/types";
import { WEDDING_DATA } from "@/constants/wedding-data";
import { isNetlifyRuntime } from "@/lib/is-netlify";
import {
  blobGetRSVPs,
  blobGetUpload,
  blobGetWedding,
  blobSaveRSVPs,
  blobSaveUpload,
  blobSaveWedding,
} from "@/lib/blob-store";

const DATA_DIR = path.join(process.cwd(), "data");
const WEDDING_FILE = path.join(DATA_DIR, "wedding.json");
const RSVP_FILE = path.join(DATA_DIR, "rsvps.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureDataDir() {
  // Serverless (Netlify/Lambda) has a read-only filesystem — never mkdir there.
  if (isNetlifyRuntime()) return;

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch {
    // Ignore on read-only environments
  }
}

function defaultWeddingData(): WeddingData {
  return {
    ...WEDDING_DATA,
    images: {
      hero: "/uploads/couple-3.jpg",
      finale: "/uploads/couple-4.jpg",
      preloader: "/uploads/couple-4.jpg",
    },
  };
}

function withDefaultImages(data: WeddingData): WeddingData {
  if (!data.images) {
    data.images = defaultWeddingData().images;
  }
  return data;
}

async function readLocalWedding(): Promise<WeddingData | null> {
  try {
    const raw = await fs.readFile(WEDDING_FILE, "utf-8");
    return withDefaultImages(JSON.parse(raw) as WeddingData);
  } catch {
    return null;
  }
}

async function readLocalRSVPs(): Promise<RSVPRecord[]> {
  try {
    const raw = await fs.readFile(RSVP_FILE, "utf-8");
    return JSON.parse(raw) as RSVPRecord[];
  } catch {
    return [];
  }
}

export async function getWeddingData(): Promise<WeddingData> {
  if (isNetlifyRuntime()) {
    const stored = await blobGetWedding();
    if (stored) return withDefaultImages(stored);

    const local = await readLocalWedding();
    if (local) return local;

    const initial = defaultWeddingData();
    await blobSaveWedding(initial);
    await blobSaveRSVPs([]);
    return initial;
  }

  await ensureDataDir();
  try {
    const raw = await fs.readFile(WEDDING_FILE, "utf-8");
    return withDefaultImages(JSON.parse(raw) as WeddingData);
  } catch {
    const initial = defaultWeddingData();
    await saveWeddingData(initial);
    return initial;
  }
}

export async function saveWeddingData(data: WeddingData): Promise<WeddingData> {
  if (isNetlifyRuntime()) {
    const saved = await blobSaveWedding(data);
    if (!saved) {
      throw new Error("Netlify Blobs unavailable — could not save wedding data");
    }
    return data;
  }

  await ensureDataDir();
  await fs.writeFile(WEDDING_FILE, JSON.stringify(data, null, 2), "utf-8");
  return data;
}

export async function getRSVPs(): Promise<RSVPRecord[]> {
  if (isNetlifyRuntime()) {
    const stored = await blobGetRSVPs();
    if (stored) return stored;
    return readLocalRSVPs();
  }

  await ensureDataDir();
  try {
    const raw = await fs.readFile(RSVP_FILE, "utf-8");
    return JSON.parse(raw) as RSVPRecord[];
  } catch {
    await fs.writeFile(RSVP_FILE, "[]", "utf-8");
    return [];
  }
}

export async function addRSVP(
  entry: Omit<RSVPRecord, "id" | "createdAt">
): Promise<RSVPRecord> {
  const rsvps = await getRSVPs();
  const record: RSVPRecord = {
    ...entry,
    id: `rsvp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  rsvps.unshift(record);

  if (isNetlifyRuntime()) {
    const saved = await blobSaveRSVPs(rsvps);
    if (!saved) {
      throw new Error("Netlify Blobs unavailable — could not save RSVP");
    }
  } else {
    await ensureDataDir();
    await fs.writeFile(RSVP_FILE, JSON.stringify(rsvps, null, 2), "utf-8");
  }

  return record;
}

export async function deleteRSVP(id: string): Promise<void> {
  const rsvps = await getRSVPs();
  const filtered = rsvps.filter((r) => r.id !== id);

  if (isNetlifyRuntime()) {
    const saved = await blobSaveRSVPs(filtered);
    if (!saved) {
      throw new Error("Netlify Blobs unavailable — could not delete RSVP");
    }
  } else {
    await ensureDataDir();
    await fs.writeFile(RSVP_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  }
}

export async function getAdminStats(): Promise<AdminStats> {
  const rsvps = await getRSVPs();
  const yes = rsvps.filter((r) => r.attending === "yes");
  const no = rsvps.filter((r) => r.attending === "no");
  const maybe = rsvps.filter((r) => r.attending === "maybe");

  return {
    totalResponses: rsvps.length,
    totalGuests: rsvps.reduce((sum, r) => sum + r.guestCount, 0),
    attendingYes: yes.length,
    attendingNo: no.length,
    attendingMaybe: maybe.length,
    guestCountYes: yes.reduce((sum, r) => sum + r.guestCount, 0),
  };
}

export function getUploadsDir() {
  return UPLOADS_DIR;
}

export async function saveUploadedFile(
  file: File,
  prefix = "photo"
): Promise<{ url: string; width: number; height: number }> {
  const ext = path.extname(file.name) || ".jpg";
  const safeName = `${prefix}-${Date.now()}${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  if (isNetlifyRuntime()) {
    const saved = await blobSaveUpload(safeName, arrayBuffer, file.type || "image/jpeg");
    if (!saved) {
      throw new Error("Netlify Blobs unavailable — could not upload image");
    }
    return {
      url: `/api/uploads/${safeName}`,
      width: 800,
      height: 1000,
    };
  }

  await ensureDataDir();
  const filePath = path.join(UPLOADS_DIR, safeName);
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  return {
    url: `/uploads/${safeName}`,
    width: 800,
    height: 1000,
  };
}

export async function getUploadedFile(filename: string) {
  if (isNetlifyRuntime()) {
    return blobGetUpload(filename);
  }

  const filePath = path.join(UPLOADS_DIR, filename);
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".gif"
            ? "image/gif"
            : "image/jpeg";

    return {
      data: data.buffer.slice(
        data.byteOffset,
        data.byteOffset + data.byteLength
      ) as ArrayBuffer,
      metadata: { contentType },
    };
  } catch {
    return null;
  }
}
