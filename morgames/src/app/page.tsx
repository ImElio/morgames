import DashboardLayout from "./DashboardLayout";
import DashboardContent from "@/components/dashboard/pages/DashboardContent";

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex h-full items-center justify-center p-8">
    <h1 className="text-4xl font-bold text-foreground/20">{title}</h1>
  </div>
);

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = searchParams.page;
  const page = Array.isArray(pageParam) ? pageParam[0] : pageParam || "dashboard";

  const renderContent = () => {
    switch (page) {
      case "dashboard":
        return <DashboardContent />;
      case "players":
        return <PlaceholderPage title="Players" />;
      case "games":
        return <PlaceholderPage title="Games" />;
      case "leaderboard":
        return <PlaceholderPage title="Leaderboard" />;
      case "analytics":
        return <PlaceholderPage title="Analytics" />;
      case "settings":
        return <PlaceholderPage title="Settings" />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DashboardLayout pageKey={page}>
      {renderContent()}
    </DashboardLayout>
  );
}