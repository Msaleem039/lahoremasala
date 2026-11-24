"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LinedHeading } from "../../components/LinedHeading";
import { SiteShell } from "../../components/SiteShell";
import { DishCard } from "../../components/DishCard";
import { categoryLabel } from "../../data/menuData";
import { useCatalog } from "../../context/CatalogContext";
import { useLanguage } from "../../context/LanguageContext";

export default function CategoryMenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t, lang } = useLanguage();
  const { dishes: products } = useCatalog();
  const dishes = slug === "all" ? products : products.filter((dish) => dish.category === slug);
  const title = categoryLabel(slug, lang);

  return (
    <SiteShell>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/menu" className="inline-flex items-center gap-2 text-terra font-semibold mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Full menu", "Menu complet")}
        </Link>
        <LinedHeading as="h1" className="script-title mb-3 text-4xl sm:text-6xl lg:text-7xl">{title}</LinedHeading>
        <p className="text-muted mb-8">
          {slug === "formules"
            ? t("Menus for one or two people.", "Formules pour une ou deux personnes.")
            : t(`${dishes.length} dishes in this course.`, `${dishes.length} plats dans cette catégorie.`)}
        </p>

        {dishes.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {dishes.map((dish) => (
              <div key={dish.id} className="w-[260px] sm:w-[280px]">
                <DishCard dish={dish} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-3xl border border-[#e5dcc8] p-12 text-center">
            <p className="text-muted">{t("That course is not on the menu.", "Cette catégorie n'est pas à la carte.")}</p>
            <Link href="/menu" className="inline-flex mt-4 bg-terra text-ink font-bold px-5 py-2.5 rounded-full">
              {t("Browse dishes", "Voir les plats")}
            </Link>
          </div>
        )}
      </main>
    </SiteShell>
  );
}
