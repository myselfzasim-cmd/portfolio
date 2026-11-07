import { getProjects, getBrands } from "@/lib/data";
import HomeClient from "@/components/HomeClient";

export const revalidate = 0;

export default async function HomePage() {
  const [projects, brands] = await Promise.all([getProjects(), getBrands()]);
  return <HomeClient initialProjects={projects} initialBrands={brands} />;
}
