"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/dashboard/Header";
import Link from "next/link";

export default function DashboardLayout({
  children,
  pageKey,
}: {
  children: React.ReactNode;
  pageKey: string;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex flex-1 flex-col overflow-x-hidden">
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 flex-col"
          >
            <div className="flex-1">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>

        <footer className="p-6 text-center">
          <p className="text-xs text-foreground/40">
            By using MORGAMES, you agree to our{" "}
            <Link href="/tos" className="underline hover:text-foreground/60">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-foreground/60"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}