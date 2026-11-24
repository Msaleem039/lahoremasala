"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Heart, Plus, Star } from "lucide-react";
import { DishImage } from "./DishImage";
import { dishDescription, dishName, dishPath, type Dish } from "../data/menuData";
import { formatPrice } from "../lib/pricing";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLanguage } from "../context/LanguageContext";

export function DishCard({ dish }: { dish: Dish }) {
  const { addToCart } = useCart();
  const { t, lang } = useLanguage();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const saved = isInWishlist(dish.id);
  const orderable = dish.orderable !== false && dish.available !== false;
  const customizable = (dish.variants?.length ?? 0) > 0 || (dish.extras?.length ?? 0) > 0;

  const handleAdd = () => {
    if (!orderable) return;
    addToCart({
      id: dish.id,
      productId: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      category: dish.category,
      description: dish.description,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  const toggleSaved = () => {
    if (saved) {
      removeFromWishlist(dish.id);
      return;
    }
    addToWishlist({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      category: dish.category,
    });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-[0_10px_28px_rgba(26,26,26,0.06)]">
      <div className="relative aspect-[4/3] bg-[#f4f4f4]">
        <Link href={dishPath(dish)} className="absolute inset-0">
          <DishImage src={dish.image} alt={dishName(dish.name, lang)} sizes="(max-width: 768px) 100vw, 280px" />
        </Link>
        <button
          type="button"
          onClick={toggleSaved}
          aria-label={saved ? t(`Remove ${dishName(dish.name, lang)} from wishlist`, `Retirer ${dishName(dish.name, lang)} de la liste`) : t(`Save ${dishName(dish.name, lang)}`, `Enregistrer ${dishName(dish.name, lang)}`)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-sm ${
            saved ? "bg-terra text-ink" : "bg-white text-ink"
          }`}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-ink">
          <Link href={dishPath(dish)} className="hover:text-terra">{dishName(dish.name, lang)}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#6b6b6b]">{dishDescription(dish.description, lang)}</p>
        {dish.reviewCount ? (
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {dish.reviewAverage?.toFixed(1)}
            <span className="sr-only">{t(`${dish.reviewCount} verified reviews`, `${dish.reviewCount} avis vérifiés`)}</span>
          </span>
        ) : null}
        {customizable && (
          <Link href={dishPath(dish)} className="mt-2 text-sm font-bold text-terra">
            {t("Customise", "Personnaliser")}
          </Link>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-terra">{formatPrice(dish.price)}</span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!orderable}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50 ${
              added ? "bg-sage" : "bg-terra hover:bg-terra-deep"
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {orderable ? (added ? t("Added", "Ajouté") : t("Add", "Ajouter")) : t("Unavailable", "Indisponible")}
          </button>
        </div>
      </div>
    </article>
  );
}
