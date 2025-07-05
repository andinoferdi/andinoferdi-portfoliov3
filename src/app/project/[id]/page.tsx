import ProjectDetails from "@/components/ProjectDetails"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectDetails id={params.id} />
}
