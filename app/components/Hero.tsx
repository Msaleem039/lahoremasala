"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, Clock, Heart, Leaf, Star } from "lucide-react";
import { DishImage } from "./DishImage";
import { ORDER_SERVICE_KEY } from "./OrderTypeDialog";
import { dishDescription, dishName, dishPath, type Dish } from "../data/menuData";
import { formatPrice } from "../lib/pricing";
import { useCatalog } from "../context/CatalogContext";
import { useLanguage } from "../context/LanguageContext";

const HERO_IDS = ["sp-1", "by-1", "pk-2", "en-1", "vg-3"];

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={`h-3 w-3 ${index < value ? "fill-current" : "text-[#e4e4e4]"}`} />
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
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto grid items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:py-14">
        <div>
          <h1 className="font-serif text-[2.45rem] font-semibold italic leading-[0.95] text-ink sm:text-6xl lg:text-[4.15rem]">
            {t("Taste the", "Savourez le")}{" "}
            <span className="font-script text-[1.15em] font-normal not-italic text-ink">{t("Happiness", "bonheur")}</span>
            <br />
            {t("in Every", "à chaque")}{" "}
            <span className="font-script text-[1.15em] font-normal not-italic text-ink">{t("Bite", "bouchée")}</span>
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
              className="rounded-full bg-terra px-6 py-3 text-sm font-bold text-ink shadow-sm hover:bg-terra-deep"
            >
              {t("Order Online", "Commander en ligne")}
            </button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <Clock className="h-4 w-4" />
            {hours}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            {[
              { icon: Leaf, en: "Fresh Ingredients", fr: "Ingrédients frais" },
              { icon: ChefHat, en: "Expert Chefs", fr: "Chefs experts" },
              { icon: Heart, en: "Made with Love", fr: "Fait avec amour" },
            ].map((point) => (
              <li key={point.en} className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f4d4bc] bg-[#fff3e8] text-[#c4510a]">
                  <point.icon className="h-5 w-5" />
                </span>
                <span className="max-w-[5.5rem] text-sm font-semibold leading-tight text-ink">{t(point.en, point.fr)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[32rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#1a1a1a" strokeWidth="1.15" strokeDasharray="3.2 2.4" />
          </svg>

          <svg className="pointer-events-none absolute left-[2%] top-[2%] h-12 w-12 drop-shadow-sm sm:h-16 sm:w-16" viewBox="0 0 64 64" aria-hidden>
            <path d="M30 18c1-7 9-10 14-6-5 1-8 5-8 8 3-1 7-1 9 2-6 0-10 2-12 5-2-4-3-7-3-9z" fill="#2f9e4f" />
            <ellipse cx="32" cy="38" rx="16" ry="15" fill="#ef7d24" />
            <ellipse cx="26" cy="33" rx="4" ry="2.4" fill="#ffe4c8" opacity="0.9" />
          </svg>

          <svg className="pointer-events-none absolute bottom-[8%] right-0 h-10 w-12 sm:h-14 sm:w-16" viewBox="0 0 72 56" aria-hidden>
            <path d="M8 34c10-18 28-22 40-8 6 8 4 18-4 22-12 6-28 2-36-14z" fill="#3aaa55" />
            <path d="M28 30c8-2 18 2 24 12" fill="none" stroke="#1f7a38" strokeWidth="1.4" />
            <path d="M36 18c8 6 10 16 6 24 8-8 8-20 0-26-2-2-4-2-6 2z" fill="#67c57a" />
          </svg>

          <div className="absolute inset-[9%] overflow-hidden rounded-full border-[8px] border-white bg-white shadow-[0_18px_40px_rgba(26,26,26,0.12)] sm:border-[10px]">
            {dish && (
              <DishImage
                src={dish.image}
                alt={dishName(dish.name, lang)}
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 460px"
              />
            )}
          </div>

          {dish && (
            <Link
              href={dishPath(dish)}
              className="absolute bottom-[7%] left-0 z-20 flex w-[13.5rem] gap-3 rounded-2xl bg-white p-3 shadow-[0_14px_34px_rgba(26,26,26,0.12)] sm:w-[15rem]"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <DishImage src={dish.image} alt="" sizes="56px" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{dishName(dish.name, lang)}</span>
                <Stars value={Math.round(dish.reviewAverage ?? dish.rating ?? 5)} />
                <span className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-muted">{dishDescription(dish.description, lang)}</span>
                <span className="mt-1 block text-sm font-extrabold text-ink">{formatPrice(dish.price)}</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
