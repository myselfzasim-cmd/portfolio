import { notFound } from "next/navigation";
import { getProjectById, getProjects } from "@/lib/data";
import ProjectDetailView from "@/components/ProjectDetailView";

export const revalidate = 0;

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject =
    allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  return <ProjectDetailView project={project} nextProject={nextProject} />;
}
