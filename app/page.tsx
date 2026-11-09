"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DishImage } from "./components/DishImage";
import { Hero } from "./components/Hero";
import { SiteShell } from "./components/SiteShell";
import { categoryLabel, dishName, dishPath, type Dish } from "./data/menuData";
import { useCatalog } from "./context/CatalogContext";
import { useLanguage } from "./context/LanguageContext";
import { apiFetch } from "./lib/clientApi";
import type { PublicReview } from "./lib/types";

const POPULAR_IDS = ["sp-1", "by-1", "pz-2", "na-3", "en-1", "sp-3", "bo-1", "na-1"];
const COURSE_IDS = [
  { slug: "specialites", id: "sp-1" },
  { slug: "biryanis", id: "by-1" },
  { slug: "naans", id: "na-3" },
  { slug: "pizzas", id: "pz-1" },
  { slug: "entrees", id: "en-1" },
  { slug: "formules", id: "fo-1" },
  { slug: "boissons", id: "bo-1" },
];

function pick(dishes: Dish[], ids: string[]) {
  return ids.map((id) => dishes.find((dish) => dish.id === id)).filter((dish): dish is Dish => Boolean(dish));
}

export default function Home() {
  const { t, lang } = useLanguage();
  const { dishes } = useCatalog();
  const row = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<PublicReview[]>([]);

  useEffect(() => {
    apiFetch("/api/food/reviews?pageSize=3")
      .then((response) => response.json())
      .then((data) => setReviews(Array.isArray(data.reviews) ? data.reviews : []))
      .catch(() => setReviews([]));
  }, []);

  const popular = pick(dishes, POPULAR_IDS);
  const shown = popular.length > 0 ? popular : dishes.slice(0, 8);
  const categories = COURSE_IDS.map((course) => {
    const dish = dishes.find((item) => item.id === course.id) ?? dishes.find((item) => item.category === course.slug);
    return dish ? { slug: course.slug, image: dish.image, name: dish.name } : null;
  }).filter((course): course is { slug: string; image: string; name: string } => Boolean(course));

  const scroll = (direction: number) => {
    row.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  return (
    <SiteShell>
      <Hero />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl font-semibold italic leading-none text-ink sm:text-5xl">
            {t("Our Popular", "Nos plats")}{" "}
            <span className="font-script text-[1.25em] font-normal not-italic text-terra">{t("Dishes", "favoris")}</span>
          </h2>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label={t("Previous dishes", "Plats précédents")}
              onClick={() => scroll(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eee] bg-white text-ink hover:border-terra"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={t("Next dishes", "Plats suivants")}
              onClick={() => scroll(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-terra text-white hover:bg-terra-deep"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={row} className="no-scrollbar flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2">
          {shown.map((dish) => (
            <Link
              key={dish.id}
              href={dishPath(dish)}
              className="w-[200px] shrink-0 snap-start rounded-[1.6rem] bg-[#f6f4f5] px-4 py-6 text-center sm:w-[220px]"
            >
              <span className="relative mx-auto block h-36 w-36 overflow-hidden rounded-full bg-white">
                <DishImage src={dish.image} alt={dishName(dish.name, lang)} sizes="144px" />
              </span>
              <span className="mt-4 block font-medium text-ink">{dishName(dish.name, lang)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h2 className="mb-8 text-center font-serif text-4xl font-semibold italic text-ink">
          {t("Browse by", "Par")}{" "}
          <span className="font-script text-[1.2em] font-normal not-italic text-terra">{t("course", "catégorie")}</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/menu/${category.slug}`} className="group rounded-[1.6rem] bg-[#f6f4f5] px-4 py-6 text-center">
              <span className="relative mx-auto block h-28 w-28 overflow-hidden rounded-full bg-white">
                <DishImage src={category.image} alt={dishName(category.name, lang)} className="object-cover transition group-hover:scale-105" />
              </span>
              <span className="mt-3 block font-medium text-ink">{categoryLabel(category.slug, lang)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h2 className="mb-8 text-center font-serif text-4xl font-semibold italic text-ink sm:text-5xl">
          {t("Verified", "Avis")}{" "}
          <span className="font-script text-[1.2em] font-normal not-italic text-terra">{t("reviews", "vérifiés")}</span>
        </h2>
        {reviews.length === 0 ? (
          <p className="text-center text-muted">{t("Approved reviews from completed orders will appear here.", "Les avis approuvés, issus de commandes terminées, apparaîtront ici.")}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <blockquote key={review.id} className="rounded-[1.6rem] border border-[#f3d5dc] bg-white p-6">
                <p className="leading-relaxed text-ink">“{review.body}”</p>
                <footer className="mt-4 text-sm font-bold text-terra">{review.author} · {review.productName} · {review.rating}/5</footer>
              </blockquote>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
