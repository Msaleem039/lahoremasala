import React from "react";

export function LinedHeading({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={`flex items-center justify-center gap-4 text-center ${className}`}>
      <span className="h-px w-8 shrink-0 bg-terra sm:w-14" aria-hidden />
      <span className="min-w-0">{children}</span>
      <span className="h-px w-8 shrink-0 bg-terra sm:w-14" aria-hidden />
    </Tag>
  );
}
