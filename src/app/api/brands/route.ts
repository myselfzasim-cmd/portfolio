import { NextResponse } from "next/server";
import { getBrands, saveBrand } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";
import { BrandRecommendation } from "@/lib/types";

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: BrandRecommendation = await req.json();

    if (!data.id || !data.name) {
      return NextResponse.json(
        { error: "Brand ID and Name are required" },
        { status: 400 }
      );
    }

    const saved = await saveBrand(data);
    return NextResponse.json({ success: true, brand: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save brand" }, { status: 500 });
  }
}