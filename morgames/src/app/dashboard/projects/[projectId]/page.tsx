import DashboardLayout from "@/app/DashboardLayout";
import ProjectDetailContent from "@/components/projects/project-detail-content";

interface ProjectDetailPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = await params;

  return (
    <DashboardLayout pageKey={`project-${projectId}`}>
      <ProjectDetailContent projectId={projectId} />
    </DashboardLayout>
  );
}
