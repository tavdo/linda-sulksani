import { getStore } from "@netlify/blobs";
import type { RSVPRecord, WeddingData } from "@/types";

const DATA_STORE = "wedding-data";
const UPLOADS_STORE = "wedding-uploads";

function dataStore() {
  return getStore(DATA_STORE);
}

function uploadsStore() {
  return getStore(UPLOADS_STORE);
}

function logBlobError(action: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[blobs] ${action} failed:`, message);
}

export async function blobGetWedding(): Promise<WeddingData | null> {
  try {
    return await dataStore().get("wedding", { type: "json", consistency: "strong" });
  } catch (err) {
    logBlobError("get wedding", err);
    return null;
  }
}

export async function blobSaveWedding(data: WeddingData): Promise<boolean> {
  try {
    await dataStore().setJSON("wedding", data);
    return true;
  } catch (err) {
    logBlobError("save wedding", err);
    return false;
  }
}

export async function blobGetRSVPs(): Promise<RSVPRecord[] | null> {
  try {
    return (
      (await dataStore().get("rsvps", { type: "json", consistency: "strong" })) ?? []
    );
  } catch (err) {
    logBlobError("get rsvps", err);
    return null;
  }
}

export async function blobSaveRSVPs(rsvps: RSVPRecord[]): Promise<boolean> {
  try {
    await dataStore().setJSON("rsvps", rsvps);
    return true;
  } catch (err) {
    logBlobError("save rsvps", err);
    return false;
  }
}

export async function blobSaveUpload(
  filename: string,
  buffer: ArrayBuffer,
  contentType: string
): Promise<boolean> {
  try {
    await uploadsStore().set(filename, buffer, {
      metadata: { contentType },
    });
    return true;
  } catch (err) {
    logBlobError("save upload", err);
    return false;
  }
}

export async function blobGetUpload(filename: string) {
  try {
    return await uploadsStore().getWithMetadata(filename, {
      type: "arrayBuffer",
      consistency: "strong",
    });
  } catch (err) {
    logBlobError("get upload", err);
    return null;
  }
}
