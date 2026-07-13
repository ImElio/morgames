import Image from "next/image";
import {
  Home,
  Gamepad2,
  Trophy,
  Users,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

type MenuItem = { name: string; icon: LucideIcon; active?: boolean };

const menu = [
  {
    name: "Dashboard",
    icon: Home,
    active: true,
  },
  {
    name: "Games",
    icon: Gamepad2,
  },
  {
    name: "Leaderboard",
    icon: Trophy,
  },
  {
    name: "Players",
    icon: Users,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
];

const settings = [
  {
    name: "Settings",
    icon: Settings,
  },
];

/**
 * Reusable component for a single sidebar item.
 * Handles active state and hover styles.
 */
function SidebarItem({ item }: { item: MenuItem }) {
  const { name, icon: Icon, active } = item;

  return (
    <button
      key={name}
      className={`
        group flex w-full items-center gap-3 rounded-xl px-3
        py-3 text-sm font-medium transition-all duration-200
        ${
          active
            ? "bg-primary/15 text-primary shadow-sm"
            : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
        }
      `}
    >
      <span
        className={`
          flex h-9 w-9 items-center justify-center rounded-lg
          text-lg transition
          ${
            active
              ? "bg-primary/20"
              : "bg-white/5 group-hover:bg-primary/10"
          }
        `}
      >
        <Icon size={20} />
      </span>

      <span>{name}</span>

      {active && (
        <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
      )}
    </button>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="
        hidden md:flex
        w-72
        min-h-screen
        flex-col
        border-r
        border-foreground/5
        bg-surface/40
        backdrop-blur-xl
        px-5
        py-6
      "
    >

      {/* Logo */}
      <div className="flex items-center px-3">
        <Image
          src="/brand/logo_text.png"
          alt="Logo"
          width={170}
          height={45}
          priority
        />
      </div>

      {/* Main Menu */}
      <nav className="mt-10 flex flex-1 flex-col gap-2">

        <p className="
          mb-2
          px-3
          text-xs
          font-medium
          uppercase
          tracking-widest
          text-foreground/40
        ">
          Menu
        </p>

        {menu.map((item) => <SidebarItem key={item.name} item={item} />)}

        {/* System */}
        <div className="mt-auto">

          <p className="
            mb-2
            px-3
            text-xs
            font-medium
            uppercase
            tracking-widest
            text-foreground/40
          ">
            System
          </p>

          {settings.map((item) => <SidebarItem key={item.name} item={item} />)}

        </div>
      </nav>

      {/* User Card */}
      <div
        className="
          mt-6
          rounded-2xl
          border
          border-foreground/5
          bg-background/40
          p-4
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              h-10
              w-10
              rounded-full
              bg-gradient-to-br
              from-primary
              to-secondary
            "
          />


          <div>

            <p className="text-sm font-semibold">
              Player
            </p>

            <p className="text-xs text-foreground/50">
              Online
            </p>

          </div>

        </div>

      </div>


    </aside>
  );
}