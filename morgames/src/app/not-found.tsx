import Link from "next/link";
import Image from "next/image";
import { Gamepad2 } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="
        relative flex min-h-screen flex-col items-center
        justify-center overflow-hidden bg-background p-8 text-center
      "
    >
      {/* Sfondo decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl lg:h-[600px] lg:w-[600px]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Effetto Glitch */}
        <div className="glitch-container relative mb-8 text-8xl font-black text-primary lg:text-9xl">
          <div className="glow">404</div>
          <div className="absolute -left-4 -top-4 -z-10 animate-pulse opacity-30">
            <Image
              src="/brand/logo_icon.png"
              alt="MORGAMES Icon"
              width={120}
              height={120}
              className="opacity-50"
            />
          </div>
        </div>

        <h2
          className="
            text-4xl
            font-bold
            text-foreground
            lg:text-5xl
          "
        >
          Lost in the game?
        </h2>

        <p
          className="
            mt-4
            max-w-md
            text-foreground/60
          "
        >
          The page you are looking for doesn't exist, was moved, or never
          spawned. Let's get you back to the lobby.
        </p>

        <Link
          href="/"
          className="
            mt-8
            group
            flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-8
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-primary/90
            hover:shadow-lg
            hover:shadow-primary/30
            active:scale-95
          "
        >
          <Gamepad2 className="h-5 w-5 transition-transform group-hover:-rotate-12" />
          Respawn
        </Link>
      </div>
    </main>
  );
}