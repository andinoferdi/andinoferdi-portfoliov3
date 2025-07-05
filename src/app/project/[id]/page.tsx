// app/project/[id]/page.tsx

import ProjectDetails from "@/components/ProjectDetails";

interface ProjectPageProps {
  // Next.js 15 now passes params as a Promise
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // await the params promise to get the real { id }
  const { id } = await params;
  return <ProjectDetails id={id} />;
}
