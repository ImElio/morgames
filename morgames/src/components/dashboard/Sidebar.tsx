import Image from "next/image";

const menu = [
  {
    name: "Dashboard",
    icon: "⌂",
    active: true,
  },
  {
    name: "Games",
    icon: "🎮",
  },
  {
    name: "Leaderboard",
    icon: "🏆",
  },
  {
    name: "Players",
    icon: "👥",
  },
  {
    name: "Analytics",
    icon: "📈",
  },
];

const settings = [
  {
    name: "Settings",
    icon: "⚙",
  },
];


export default function Sidebar() {
  return (
    <aside
      className="
        hidden md:flex
        w-72
        min-h-screen
        flex-col
        border-r
        border-white/5
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


        {menu.map((item) => (

          <button
            key={item.name}
            className={`
              group
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              transition-all
              duration-200

              ${
                item.active
                ? `
                  bg-primary/15
                  text-primary
                  shadow-sm
                `
                :
                `
                  text-foreground/60
                  hover:bg-white/5
                  hover:text-foreground
                `
              }
            `}
          >

            <span
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-lg
                transition

                ${
                  item.active
                  ? "bg-primary/20"
                  : "bg-white/5 group-hover:bg-primary/10"
                }
              `}
            >
              {item.icon}
            </span>


            <span className="font-medium">
              {item.name}
            </span>


            {
              item.active && (
                <span
                  className="
                    ml-auto
                    h-2
                    w-2
                    rounded-full
                    bg-primary
                  "
                />
              )
            }


          </button>

        ))}


        {/* Settings */}

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


          {settings.map((item)=>(

            <button
              key={item.name}
              className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                text-foreground/60
                transition
                hover:bg-white/5
                hover:text-foreground
              "
            >

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/5
                  text-lg
                  group-hover:bg-primary/10
                "
              >
                {item.icon}
              </span>


              {item.name}

            </button>

          ))}


        </div>


      </nav>


      {/* User Card */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-white/5
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