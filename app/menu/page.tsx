"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, UtensilsCrossed } from "lucide-react";
import { LinedHeading } from "../components/LinedHeading";
import { SiteShell } from "../components/SiteShell";
import { DishCard } from "../components/DishCard";
import { CATEGORIES, categoryLabel, dishDescription, dishName, type MenuCategory } from "../data/menuData";
import { useCatalog } from "../context/CatalogContext";
import { useLanguage } from "../context/LanguageContext";

export default function MenuPage() {
  return (
    <Suspense fallback={null}>
      <MenuContent />
    </Suspense>
  );
}

function MenuContent() {
  const { t, lang } = useLanguage();
  const { dishes: products } = useCatalog();
  const params = useSearchParams();
  const urlSearch = params.get("search") ?? "";
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter((dish) => {
      const matchesCategory = selectedCat === "all" || dish.category === selectedCat;
      const matchesSearch =
        q === "" ||
        dish.name.toLowerCase().includes(q) ||
        dishName(dish.name, "fr").toLowerCase().includes(q) ||
        dishName(dish.name, "en").toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        dishDescription(dish.description, "fr").toLowerCase().includes(q) ||
        dishDescription(dish.description, "en").toLowerCase().includes(q) ||
        dish.category.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCat, searchQuery]);

  const grouped = selectedCat === "all" && searchQuery.trim() === "";

  return (
    <SiteShell>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8 text-center">
          <LinedHeading as="h1" className="font-serif text-5xl font-semibold italic leading-none text-ink sm:text-7xl">
            {t("The", "La")}{" "}
            <span className="font-script text-[1.15em] font-normal not-italic text-terra">{t("Menu", "carte")}</span>
          </LinedHeading>
          <p className="mt-3 text-muted">{t("Special menus, chicken dishes, biryani, vegetarian dishes and starters.", "Formules spéciales, plats poulet, biryani, plats végétariens et entrées.")}</p>
        </div>

        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search butter chicken, biryani, samosa...", "Rechercher butter chicken, biryani, samosa...")}
            className="field pl-11"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setSelectedCat(category.slug)}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                selectedCat === category.slug ? "bg-terra text-ink" : "border border-[#f4d4bc] bg-white text-ink"
              }`}
            >
              {categoryLabel(category.slug, lang)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#f4d4bc] bg-[#fff3e8] py-16 text-center">
            <UtensilsCrossed className="w-10 h-10 mx-auto text-sage mb-3" />
            <p className="font-semibold">{t("No dishes match that search.", "Aucun plat ne correspond à cette recherche.")}</p>
          </div>
        ) : grouped ? (
          <div className="space-y-12">
            {CATEGORIES.filter((category) => category.slug !== "all").map((category) => {
              const dishes = products.filter((dish) => dish.category === category.slug);
              if (dishes.length === 0) return null;
              return (
                <section key={category.slug}>
                  <LinedHeading className="script-title mb-5 text-4xl sm:text-5xl">{categoryLabel(category.slug, lang)}</LinedHeading>
                  <div className="flex flex-wrap justify-center gap-4">
                    {dishes.map((dish) => (
                      <div key={dish.id} className="w-[260px] sm:w-[280px]">
                        <DishCard dish={dish} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div>
            {selectedCat !== "all" && (
              <LinedHeading className="script-title mb-5 text-4xl sm:text-5xl">{categoryLabel(selectedCat as MenuCategory, lang)}</LinedHeading>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              {filtered.map((dish) => (
                <div key={dish.id} className="w-[260px] sm:w-[280px]">
                  <DishCard dish={dish} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </SiteShell>
  );
}
