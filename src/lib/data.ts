import fs from "fs/promises";
import path from "path";
import { Project, SiteData, BrandRecommendation, GalleryItem } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const SITE_FILE = path.join(DATA_DIR, "site.json");
const BRANDS_FILE = path.join(DATA_DIR, "brands.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");

// Ensure data directory exists
async function ensureFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(PROJECTS_FILE);
    } catch {
      const fallbackProjects = path.join(process.cwd(), "assets", "data", "projects.json");
      try {
        const content = await fs.readFile(fallbackProjects, "utf-8");
        await fs.writeFile(PROJECTS_FILE, content, "utf-8");
      } catch {
        await fs.writeFile(PROJECTS_FILE, "[]", "utf-8");
      }
    }

    try {
      await fs.access(SITE_FILE);
    } catch {
      const fallbackSite = path.join(process.cwd(), "assets", "data", "site.json");
      try {
        const content = await fs.readFile(fallbackSite, "utf-8");
        await fs.writeFile(SITE_FILE, content, "utf-8");
      } catch {
        await fs.writeFile(SITE_FILE, "{}", "utf-8");
      }
    }

    try {
      await fs.access(BRANDS_FILE);
    } catch {
      await fs.writeFile(BRANDS_FILE, "[]", "utf-8");
    }

    try {
      await fs.access(GALLERY_FILE);
    } catch {
      await fs.writeFile(GALLERY_FILE, "[]", "utf-8");
    }
  } catch (err) {
    console.error("Error ensuring data files:", err);
  }
}

export async function getProjects(): Promise<Project[]> {
  await ensureFiles();
  try {
    const data = await fs.readFile(PROJECTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects:", err);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  await ensureFiles();
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === project.id);

  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.unshift(project);
  }

  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  await ensureFiles();
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;

  await fs.writeFile(PROJECTS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function getSiteData(): Promise<SiteData> {
  await ensureFiles();
  try {
    const data = await fs.readFile(SITE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading site data:", err);
    throw err;
  }
}

export async function saveSiteData(siteData: SiteData): Promise<SiteData> {
  await ensureFiles();
  await fs.writeFile(SITE_FILE, JSON.stringify(siteData, null, 2), "utf-8");
  return siteData;
}

// ---------------- BRANDS & RECOMMENDATIONS ----------------
export async function getBrands(): Promise<BrandRecommendation[]> {
  await ensureFiles();
  try {
    const data = await fs.readFile(BRANDS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading brands:", err);
    return [];
  }
}

export async function saveBrand(brand: BrandRecommendation): Promise<BrandRecommendation> {
  await ensureFiles();
  const brands = await getBrands();
  const index = brands.findIndex((b) => b.id === brand.id);

  if (index >= 0) {
    brands[index] = brand;
  } else {
    brands.push(brand);
  }

  await fs.writeFile(BRANDS_FILE, JSON.stringify(brands, null, 2), "utf-8");
  return brand;
}

export async function deleteBrand(id: string): Promise<boolean> {
  await ensureFiles();
  const brands = await getBrands();
  const filtered = brands.filter((b) => b.id !== id);
  if (filtered.length === brands.length) return false;

  await fs.writeFile(BRANDS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

// ---------------- PHOTO GALLERY ----------------
export async function getGalleryItems(): Promise<GalleryItem[]> {
  await ensureFiles();
  try {
    const data = await fs.readFile(GALLERY_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading gallery items:", err);
    return [];
  }
}

export async function saveGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  await ensureFiles();
  const items = await getGalleryItems();
  const index = items.findIndex((g) => g.id === item.id);

  if (index >= 0) {
    items[index] = item;
  } else {
    items.unshift(item);
  }

  await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2), "utf-8");
  return item;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  await ensureFiles();
  const items = await getGalleryItems();
  const filtered = items.filter((g) => g.id !== id);
  if (filtered.length === items.length) return false;

  await fs.writeFile(GALLERY_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
