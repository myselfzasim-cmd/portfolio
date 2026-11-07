import { NextResponse } from "next/server";
import { getBrands, saveBrand, deleteBrand } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";
import { BrandRecommendation } from "@/lib/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const brands = await getBrands();
    const brand = brands.find((b) => b.id === params.id);
    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch brand" }, { status: 500 });
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

    const data: BrandRecommendation = await req.json();
    data.id = params.id;

    const saved = await saveBrand(data);
    return NextResponse.json({ success: true, brand: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
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

    const success = await deleteBrand(params.id);
    if (!success) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}