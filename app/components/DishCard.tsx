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
    <article className="relative flex flex-col rounded-[1.7rem] bg-[#f6f4f5] px-4 pb-5 pt-5 text-center">
      <button
        type="button"
        onClick={toggleSaved}
        aria-label={saved ? t(`Remove ${dishName(dish.name, lang)} from wishlist`, `Retirer ${dishName(dish.name, lang)} de la liste`) : t(`Save ${dishName(dish.name, lang)}`, `Enregistrer ${dishName(dish.name, lang)}`)}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-sm ${
          saved ? "bg-terra text-white" : "bg-white text-ink"
        }`}
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      </button>
      <Link href={dishPath(dish)} className="relative mx-auto block h-40 w-40 overflow-hidden rounded-full bg-white">
        <DishImage src={dish.image} alt={dishName(dish.name, lang)} />
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="font-semibold leading-tight text-ink">
          <Link href={dishPath(dish)} className="hover:text-terra">{dishName(dish.name, lang)}</Link>
        </h3>
        {dish.reviewCount ? (
          <span className="mt-1 inline-flex items-center justify-center gap-1 text-xs font-bold text-amber-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {dish.reviewAverage?.toFixed(1)}
            <span className="sr-only">{t(`${dish.reviewCount} verified reviews`, `${dish.reviewCount} avis vérifiés`)}</span>
          </span>
        ) : null}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{dishDescription(dish.description, lang)}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-lg font-extrabold text-terra">{formatPrice(dish.price)}</span>
          {customizable && (
            <Link href={dishPath(dish)} className="text-sm font-bold text-terra">
              {t("Customise", "Personnaliser")}
            </Link>
          )}
          <button
            type="button"
            onClick={handleAdd}
            disabled={!orderable}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 ${
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
