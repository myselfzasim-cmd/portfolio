import { NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";
import { SiteData } from "@/lib/types";

export async function GET() {
  try {
    const site = await getSiteData();
    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch site data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: SiteData = await req.json();
    const saved = await saveSiteData(data);
    return NextResponse.json({ success: true, site: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site data" }, { status: 500 });
  }
}
