"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Star } from "lucide-react";
import { DishImage } from "./DishImage";
import { ORDER_SERVICE_KEY } from "./OrderTypeDialog";
import { dishDescription, dishName, dishPath, type Dish } from "../data/menuData";
import { formatPrice } from "../lib/pricing";
import { useCatalog } from "../context/CatalogContext";
import { useLanguage } from "../context/LanguageContext";

const HERO_IDS = ["by-1", "sp-1", "na-3", "pz-2", "en-1"];

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={`h-3 w-3 ${index < value ? "fill-current" : "text-[#f0d5dc]"}`} />
      ))}
    </span>
  );
}

export const Hero: React.FC = () => {
  const { t, lang } = useLanguage();
  const { dishes, info } = useCatalog();
  const router = useRouter();
  const heroDishes = HERO_IDS.map((id) => dishes.find((dish) => dish.id === id)).filter((dish): dish is Dish => Boolean(dish));
  const slides = heroDishes.length > 0 ? heroDishes : dishes.slice(0, 5);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const dish = slides[active];

  useEffect(() => {
    if (paused || count < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  useEffect(() => {
    if (count > 0 && active >= count) queueMicrotask(() => setActive(0));
  }, [active, count]);

  const begin = (service: "delivery" | "pickup") => {
    sessionStorage.setItem(ORDER_SERVICE_KEY, service);
    router.push(dish ? `/menu/${dish.category}` : "/menu");
  };

  const hours = info?.hoursShort
    ? t(`Open ${info.hoursShort.replace(" — ", " to ")}`, `Ouvert ${info.hoursShort.replace(" — ", " à ")}`)
    : t("Open daily", "Ouvert tous les jours");

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fff0f3] via-white to-white" />
      <div className="relative mx-auto grid items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:py-14">
        <div>
          <h1 className="font-serif text-[2.45rem] font-semibold italic leading-[0.95] text-ink sm:text-6xl lg:text-[4.15rem]">
            {t("Taste the", "Savourez le")}{" "}
            <span className="font-script text-[1.15em] font-normal not-italic text-terra">{t("Happiness", "bonheur")}</span>
            <br />
            {t("in Every", "à chaque")}{" "}
            <span className="font-script text-[1.15em] font-normal not-italic text-terra">{t("Bite", "bouchée")}</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {t(
              "Delicious meals made with love and fresh ingredients.",
              "Des plats délicieux préparés avec amour et des ingrédients frais.",
            )}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => begin("delivery")}
              className="rounded-full bg-terra px-6 py-3 text-sm font-bold text-white shadow-md shadow-terra/25 hover:bg-terra-deep"
            >
              {t("Order Online", "Commander en ligne")}
            </button>
            <button
              type="button"
              onClick={() => begin("pickup")}
              className="rounded-full border border-[#e7e7e7] bg-white px-6 py-3 text-sm font-bold text-ink hover:border-terra"
            >
              {t("Takeaway", "À emporter")}
            </button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <Clock className="h-4 w-4" />
            {hours}
          </p>
        </div>

        <div
          className="relative mx-auto h-[19rem] w-full max-w-[20rem] sm:h-[28rem] sm:max-w-[34rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg className="pointer-events-none absolute left-1/2 top-2 h-[76%] w-[76%] -translate-x-1/2 sm:left-auto sm:right-0 sm:top-0 sm:h-[92%] sm:w-[92%] sm:translate-x-0" viewBox="0 0 100 100" aria-hidden>
            <circle cx="52" cy="48" r="44" fill="none" stroke="#ef2b3c" strokeWidth="1.15" strokeDasharray="3.2 2.4" />
          </svg>

          <svg className="pointer-events-none absolute left-[4%] top-0 h-12 w-12 drop-shadow-sm sm:left-[8%] sm:h-16 sm:w-16" viewBox="0 0 64 64" aria-hidden>
            <path d="M30 18c1-7 9-10 14-6-5 1-8 5-8 8 3-1 7-1 9 2-6 0-10 2-12 5-2-4-3-7-3-9z" fill="#2f9e4f" />
            <ellipse cx="32" cy="38" rx="16" ry="15" fill="#ef3b3b" />
            <ellipse cx="26" cy="33" rx="4" ry="2.4" fill="#ffb4b0" opacity="0.85" />
          </svg>

          <svg className="pointer-events-none absolute bottom-[18%] right-[2%] h-10 w-12 sm:h-14 sm:w-16" viewBox="0 0 72 56" aria-hidden>
            <path d="M8 34c10-18 28-22 40-8 6 8 4 18-4 22-12 6-28 2-36-14z" fill="#3aaa55" />
            <path d="M28 30c8-2 18 2 24 12" fill="none" stroke="#1f7a38" strokeWidth="1.4" />
            <path d="M36 18c8 6 10 16 6 24 8-8 8-20 0-26-2-2-4-2-6 2z" fill="#67c57a" />
          </svg>

          <div className="absolute left-1/2 top-[16%] h-[58%] w-[58%] -translate-x-1/2 overflow-hidden rounded-full border-8 border-white bg-[#fff5f6] shadow-[0_18px_40px_rgba(80,20,30,0.14)] sm:left-[14%] sm:top-[12%] sm:h-[74%] sm:w-[70%] sm:translate-x-0 sm:border-[10px]">
            {dish && (
              <DishImage
                src={dish.image}
                alt={dishName(dish.name, lang)}
                priority
                sizes="(max-width: 1024px) 70vw, 420px"
              />
            )}
          </div>

          {dish && (
            <Link
              href={dishPath(dish)}
              className="absolute bottom-[7%] left-0 z-20 flex w-[13.5rem] gap-3 rounded-2xl bg-white p-3 shadow-[0_14px_34px_rgba(40,10,20,0.12)] sm:w-[15rem]"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <DishImage src={dish.image} alt="" sizes="56px" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{dishName(dish.name, lang)}</span>
                <Stars value={Math.round(dish.reviewAverage ?? dish.rating ?? 5)} />
                <span className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-muted">{dishDescription(dish.description, lang)}</span>
                <span className="mt-1 block text-sm font-extrabold text-terra">{formatPrice(dish.price)}</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
