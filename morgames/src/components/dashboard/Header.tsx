import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-surface
        px-8
      "
    >

      <div>
        <h2 className="text-xl text-foreground/60">
          Welcome back!
        </h2>
      </div>


      <div className="flex items-center gap-4">

        <button
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            bg-surface
            text-sm
            text-foreground/60
            transition-colors hover:bg-foreground/5 hover:text-foreground
          "
        >
          <Bell size={20} />
        </button>


        <div
          className="
            h-10
            w-10
            rounded-full
            bg-primary
          "
        />

      </div>


    </header>
  );
}