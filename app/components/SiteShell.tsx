"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { OrderingBanner } from "./OrderingBanner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh bg-shell px-0.5 pt-0.5 sm:px-1.5 sm:pt-1.5 md:px-2 md:pt-2">
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col overflow-hidden rounded-t-[1.25rem] bg-white shadow-[0_12px_32px_rgba(180,30,60,0.14)]">
        <Navbar />
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <OrderingBanner />
          {children}
          <Footer />
          
        </div>
      </div>
    </div>
  );
}
