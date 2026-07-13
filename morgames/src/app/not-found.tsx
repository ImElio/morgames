import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-background
        px-6
      "
    >

      <div
        className="
          flex
          max-w-lg
          flex-col
          items-center
          text-center
        "
      >

        <h1
          className="
            mt-8
            text-8xl
            font-black
            text-primary
          "
        >
          404
        </h1>


        <h2
          className="
            mt-4
            text-3xl
            font-bold
            text-foreground
          "
        >
          Lost in the game?
        </h2>


        <p
          className="
            mt-3
            max-w-md
            text-foreground/60
          "
        >
          The page you are looking for doesn't exist,
          was moved, or never spawned.
        </p>

        <Link
          href="/"
          className="
            mt-8
            rounded-xl
            bg-primary
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:opacity-90
            hover:scale-105
          "
        >
          Respawn
        </Link>


      </div>


    </main>
  );
}