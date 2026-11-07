import { getProjects } from "@/lib/data";
import HomeClient from "@/components/HomeClient";

export const revalidate = 0;

export default async function HomePage() {
  const projects = await getProjects();
  return <HomeClient initialProjects={projects} />;
}
