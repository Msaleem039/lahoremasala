"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DishCard } from "./components/DishCard";
import { LinedHeading } from "./components/LinedHeading";
import { DishImage } from "./components/DishImage";
import { Hero } from "./components/Hero";
import { SiteShell } from "./components/SiteShell";
import { categoryLabel, dishName, type Dish } from "./data/menuData";
import { useCatalog } from "./context/CatalogContext";
import { useLanguage } from "./context/LanguageContext";
import { apiFetch } from "./lib/clientApi";
import type { PublicReview } from "./lib/types";

const POPULAR_IDS = ["fo-1", "sp-1", "pk-2", "by-1", "vg-1", "en-1", "pk-7", "vg-3"];
const COURSE_IDS = [
  { slug: "formules", id: "fo-1" },
  { slug: "poulet", id: "sp-1" },
  { slug: "biryanis", id: "by-1" },
  { slug: "vegetariens", id: "vg-1" },
  { slug: "entrees", id: "en-1" },
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
        <div className="relative mb-8">
          <LinedHeading className="font-serif text-4xl font-semibold italic leading-none text-ink sm:text-5xl">
            {t("Our Popular", "Nos plats")}{" "}
            <span className="font-script text-[1.25em] font-normal not-italic text-terra">{t("Dishes", "favoris")}</span>
          </LinedHeading>
          <div className="mt-4 flex justify-center gap-2 sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-terra text-ink hover:bg-terra-deep"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={row} className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-smooth pb-2">
          {shown.map((dish) => (
            <div key={dish.id} className="w-[260px] shrink-0 snap-start sm:w-[280px]">
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <LinedHeading className="mb-8 font-serif text-4xl font-semibold italic text-ink">
          {t("Browse by", "Par")}{" "}
          <span className="font-script text-[1.2em] font-normal not-italic text-terra">{t("course", "catégorie")}</span>
        </LinedHeading>
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
        <LinedHeading className="mb-8 font-serif text-4xl font-semibold italic text-ink sm:text-5xl">
          {t("Verified", "Avis")}{" "}
          <span className="font-script text-[1.2em] font-normal not-italic text-terra">{t("reviews", "vérifiés")}</span>
        </LinedHeading>
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
