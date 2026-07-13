import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import GameCard from "@/components/dashboard/GameCard";
import PlayerStats from "@/components/dashboard/PlayerStats";
import ActivityPanel from "@/components/dashboard/ActivityPanel";

const stats = [
  { id: 1, title: "Games", value: "24" },
  { id: 2, title: "Players", value: "8.4K" },
  { id: 3, title: "Playtime", value: "426h" },
  { id: 4, title: "Rank", value: "#128" },
];


export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-foreground/60">
              Manage your gaming profile and statistics.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.id} title={stat.title} value={stat.value} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-1">
              <GameCard />
            </div>
            <div>
              <PlayerStats />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <ActivityPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}