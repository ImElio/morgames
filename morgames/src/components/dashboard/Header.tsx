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
            rounded-xl
            bg-surface
            px-4
            py-2
            text-sm
          "
        >
          🔔
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