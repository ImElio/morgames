import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import GameCard from "@/components/dashboard/GameCard";
import PlayerStats from "@/components/dashboard/PlayerStats";
import ActivityPanel from "@/components/dashboard/ActivityPanel";


export default function Home() {
  return (
    <main className="flex min-h-screen bg-background">

      <Sidebar />

      <div className="flex-1">

        <Header />


        <section className="p-8">

          <h1 className="text-3xl font-bold text-foreground">
            Dashboard
          </h1>

          <p className="mt-2 text-foreground/60">
            Manage your gaming profile and statistics.
          </p>


          <div className="mt-8 grid gap-6 md:grid-cols-4">

            <StatCard
              title="Games"
              value="24"
            />

            <StatCard
              title="Players"
              value="8.4K"
            />

            <StatCard
              title="Playtime"
              value="426h"
            />

            <StatCard
              title="Rank"
              value="#128"
            />

          </div>


          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            <GameCard />

            <PlayerStats />

            <ActivityPanel />

          </div>


        </section>

      </div>

    </main>
  );
}