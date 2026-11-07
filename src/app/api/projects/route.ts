import { NextResponse } from "next/server";
import { getProjects, saveProject } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";
import { Project } from "@/lib/types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const projects = await getProjects();

    if (all) {
      return NextResponse.json(projects);
    }

    // Default: only return published projects
    const published = projects.filter((p) => p.published !== false);
    return NextResponse.json(published);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: Project = await req.json();

    if (!data.id || !data.en?.title) {
      return NextResponse.json(
        { error: "Project ID and English title are required" },
        { status: 400 }
      );
    }

    const saved = await saveProject(data);
    return NextResponse.json({ success: true, project: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
