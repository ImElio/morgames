import AuthLogo from "./AuthLogo";

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}


export default function AuthCard({
  children,
  title,
  description,
}: Props) {

  return (

    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-surface/70
        p-8
        shadow-2xl
        backdrop-blur-xl
      "
    >

      <AuthLogo />


      <div className="mt-8 text-center">

        <h1
          className="
            text-3xl
            font-bold
            text-foreground
          "
        >
          {title}
        </h1>


        <p
          className="
            mt-2
            text-sm
            text-foreground/60
          "
        >
          {description}
        </p>


      </div>


      <div className="mt-8">
        {children}
      </div>


    </div>

  );
}