"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Logo } from "./Logo";
import { useLanguage } from "../context/LanguageContext";

const LINKS = [
  { href: "/", en: "Home", fr: "Accueil" },
  { href: "/menu", en: "Menu", fr: "Menu" },
  { href: "/about", en: "About", fr: "À propos" },
  { href: "/contact", en: "Contact", fr: "Contact" },
];

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const next = query.trim();
    setSearchOpen(false);
    setMobileMenuOpen(false);
    router.push(next ? `/menu?search=${encodeURIComponent(next)}` : "/menu");
  };

  return (
    <header className="relative z-40 border-b border-[#f4d4bc] bg-white">
      <div className="mx-auto flex items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-3.5 lg:px-10">
        <Link href="/" className="leading-none" aria-label="Taste of Lahore Masala home">
          <Logo compact />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1.5 text-[11px] font-extrabold uppercase leading-none tracking-[0.16em] ${active ? "text-terra" : "text-ink hover:text-terra"}`}
              >
                {t(link.en, link.fr)}
                {active && <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-terra" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="rounded-full p-1.5 text-ink hover:bg-[#fff3e8] sm:p-2"
            aria-label={t("Search the menu", "Rechercher dans le menu")}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" className="relative rounded-full p-1.5 text-ink hover:bg-[#fff3e8] sm:p-2" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-terra px-1 text-[10px] font-bold text-ink">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative rounded-full p-1.5 text-ink hover:bg-[#fff3e8] sm:p-2" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-terra px-1 text-[10px] font-bold text-ink">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/profile" className="hidden rounded-full p-2 text-ink hover:bg-[#fff3e8] sm:inline-flex" aria-label={t("Account", "Compte")}>
            <User className="h-5 w-5" />
          </Link>
          <div className="mx-1 hidden overflow-hidden rounded-full border border-[#f4d4bc] text-[11px] font-bold lg:flex">
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`px-2 py-1 ${lang === "fr" ? "bg-terra text-ink" : "text-ink"}`}
              aria-label="Français"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-1 ${lang === "en" ? "bg-terra text-ink" : "text-ink"}`}
              aria-label="English"
            >
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-full p-2 text-ink md:hidden"
            aria-label={mobileMenuOpen ? t("Close menu", "Fermer le menu") : t("Open menu", "Ouvrir le menu")}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-[#f4d4bc] px-4 py-3 sm:px-6 lg:px-10">
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("Search butter chicken, biryani, samosa...", "Rechercher butter chicken, biryani, samosa...")}
              className="field pl-11"
            />
          </div>
        </form>
      )}

      {mobileMenuOpen && (
        <nav className="absolute inset-x-0 top-full z-50 border-b border-[#f4d4bc] bg-white px-4 py-3 shadow-lg md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-2 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink"
            >
              {t(link.en, link.fr)}
            </Link>
          ))}
          <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink">
            {t("Account", "Compte")}
          </Link>
          <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink">
            {t("Orders", "Commandes")}
          </Link>
          <div className="mt-3 flex gap-2 px-2">
            <button type="button" onClick={() => setLang("fr")} className={`rounded-full px-4 py-2 text-sm font-bold ${lang === "fr" ? "bg-terra text-ink" : "border border-[#f4d4bc]"}`}>
              FR
            </button>
            <button type="button" onClick={() => setLang("en")} className={`rounded-full px-4 py-2 text-sm font-bold ${lang === "en" ? "bg-terra text-ink" : "border border-[#f4d4bc]"}`}>
              EN
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
