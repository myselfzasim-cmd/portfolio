import { NextResponse } from "next/server";
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";
import { GalleryItem } from "@/lib/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const items = await getGalleryItems();
    const item = items.find((g) => g.id === params.id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery item" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: GalleryItem = await req.json();
    data.id = params.id;

    const saved = await saveGalleryItem(data);
    return NextResponse.json({ success: true, item: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const success = await deleteGalleryItem(params.id);
    if (!success) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}