import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="flex flex-col items-center">

      <Image
        src="/brand/logo_icon.png"
        alt="Logo"
        width={90}
        height={90}
        priority
      />

    </div>
  );
}