import React from "react";
import { UtensilsCrossed } from "lucide-react";

export function Logo({
  size = "md",
  onDark = false,
  compact = false,
}: {
  size?: "md" | "lg";
  onDark?: boolean;
  compact?: boolean;
}) {
  const name = size === "lg" ? "text-2xl sm:text-3xl" : "text-[0.95rem] leading-none sm:text-lg";
  const script = size === "lg" ? "text-3xl sm:text-4xl" : "text-[1.15rem] sm:text-2xl";
  const icon = size === "lg" ? "h-12 w-12" : "h-8 w-8 sm:h-9 sm:w-9";

  return (
    <span className="inline-flex items-center gap-2 leading-none" role="img" aria-label="Taste of Lahore Masala">
      <span className={`flex ${icon} shrink-0 items-center justify-center rounded-full bg-terra text-white`}>
        <UtensilsCrossed className={size === "lg" ? "h-6 w-6" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} />
      </span>
      <span className="min-w-0">
        <span className={`block font-script leading-none text-terra ${script}`}>Taste of</span>
        <span className={`block font-serif font-bold tracking-tight ${name}`}>
          <span className={onDark ? "text-cream" : "text-ink"}>Lahore </span>
          <span className="text-terra">Masala</span>
        </span>
        {!compact && (
          <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.14em] text-muted sm:block">
            tasteoflahoremasala.com
          </span>
        )}
      </span>
    </span>
  );
}
