interface Props {
  title: string;
  value: string;
}


export default function StatCard({
  title,
  value,
}: Props) {

  return (
    <div
      className="
        rounded-2xl
        bg-surface
        p-6
      "
    >

      <p className="text-sm text-foreground/60">
        {title}
      </p>


      <h3
        className="
          mt-3
          text-4xl
          font-bold
          text-primary
        "
      >
        {value}
      </h3>


    </div>
  );
}