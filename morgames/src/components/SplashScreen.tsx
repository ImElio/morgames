"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [expand, setExpand] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setExpand(true);
    }, 3000);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background">

      {/* Riempimento pagina */}
      <div
        className={`
          absolute inset-0 bg-primary
          transition-transform duration-1000
          origin-bottom
          ${expand ? "scale-y-100" : "scale-y-0"}
        `}
      />

      {/* Logo finale */}
      <div
        className={`
          absolute z-10
          transition-all duration-700 delay-300
          ${
            expand
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }
        `}
      >
        <Image
          src="/brand/logo_text.png"
          alt="Logo"
          width={800}
          height={800}
          priority
        />
      </div>


      {/* Loading iniziale */}
      <div
        className={`
          flex flex-col items-center
          transition-opacity duration-500
          ${expand ? "opacity-0" : "opacity-100"}
        `}
      >

        <div className="animate-pulse">
          <Image
            src="/brand/logo_icon.png"
            alt="Logo"
            width={140}
            height={140}
            priority
          />
        </div>


        <p className="mt-10 text-sm uppercase tracking-[0.4em] text-foreground/60">
          Loading...
        </p>


        <div className="mt-5 h-1 w-64 overflow-hidden rounded-full bg-surface">
          <div
            className="
              h-full w-1/3 rounded-full
              bg-primary
              animate-[loading_1.5s_ease-in-out_infinite]
            "
          />
        </div>

      </div>

      {/* ToS & Privacy Policy */}
      <div
        className={`
          absolute bottom-8 w-full px-4 text-center
          text-xs text-foreground/40
          transition-opacity duration-500
          ${expand ? "opacity-0" : "opacity-100"}
        `}
      >
        <p>
          By continuing, you agree to our{" "}
          <a href="/tos" className="underline hover:text-foreground/60">Terms of Service</a> and{" "}
          <a href="/privacy" className="underline hover:text-foreground/60">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}