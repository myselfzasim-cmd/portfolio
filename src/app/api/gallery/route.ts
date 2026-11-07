import { NextResponse } from "next/server";
import { getGalleryItems, saveGalleryItem } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";
import { GalleryItem } from "@/lib/types";

export async function GET() {
  try {
    const items = await getGalleryItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: GalleryItem = await req.json();

    if (!data.id || !data.imageUrl) {
      return NextResponse.json(
        { error: "Gallery Item ID and Image URL are required" },
        { status: 400 }
      );
    }

    const saved = await saveGalleryItem(data);
    return NextResponse.json({ success: true, item: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save gallery item" }, { status: 500 });
  }
}