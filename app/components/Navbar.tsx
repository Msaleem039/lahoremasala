"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Heart, MapPin, Menu, Phone, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCatalog } from "../context/CatalogContext";
import { Logo } from "./Logo";
import { useLanguage } from "../context/LanguageContext";

const ADDRESS = "5/3 Contour de l'Église St Martin, 59100 Roubaix";
const PHONE = "+92 42 111 228 325";

const SOCIALS = [
  {
    label: "Facebook",
    path: "M14.5 8.5V6.8c0-.7.1-1.1 1.2-1.1h1.3V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.2v-9.8h2.2l.3-2.7h-2.5z",
  },
  {
    label: "Instagram",
    path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8A3.2 3.2 0 0 0 19.2 16V8A3.2 3.2 0 0 0 16 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z",
  },
  {
    label: "Twitter",
    path: "M21 6.3a6.6 6.6 0 0 1-1.9.5 3.3 3.3 0 0 0 1.5-1.8 6.6 6.6 0 0 1-2.1.8 3.3 3.3 0 0 0-5.7 3 9.4 9.4 0 0 1-6.8-3.5 3.3 3.3 0 0 0 1 4.4 3.3 3.3 0 0 1-1.5-.4v.1a3.3 3.3 0 0 0 2.7 3.2 3.3 3.3 0 0 1-1.5.1 3.3 3.3 0 0 0 3.1 2.3A6.7 6.7 0 0 1 4 16.6 9.4 9.4 0 0 0 9.1 18c6.1 0 9.5-5.1 9.5-9.5v-.4A6.7 6.7 0 0 0 21 6.3z",
  },
  {
    label: "Pinterest",
    path: "M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.8 0-2.6l1.6-6.6s-.4-.8-.4-1.9c0-1.8 1-3.1 2.3-3.1 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1.1 4.2-.3 1.3.6 2.3 1.9 2.3 2.3 0 3.8-2.9 3.8-6.4 0-2.6-1.8-4.6-5-4.6a5.3 5.3 0 0 0-5.6 5.3c0 1 .4 2.1.8 2.7a.3.3 0 0 1 .1.3l-.3 1.2c0 .2-.2.3-.4.2-1.5-.6-2.2-2.3-2.2-4.2 0-3.1 2.6-6.9 7.8-6.9 4.1 0 6.9 3 6.9 6.2 0 4.3-2.4 7.5-5.9 7.5-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-.9 2.1-1.4 2.8A9 9 0 1 0 12 3z",
  },
];

function hoursLabel(hoursShort: string | undefined, french: boolean) {
  const source = hoursShort && /\d/.test(hoursShort) ? hoursShort : "11:00 — 23:00";
  const match = source.match(/(\d{1,2}):(\d{2})\s*[—–-]\s*(\d{1,2}):(\d{2})/);
  if (!match) return french ? `Lun – Dim : ${source}` : `Mon – Sun: ${source}`;
  const [, openHour, openMinute, closeHour, closeMinute] = match;
  if (french) return `Lun – Dim : ${openHour.padStart(2, "0")}:${openMinute} – ${closeHour.padStart(2, "0")}:${closeMinute}`;
  const to12 = (hour: string, minute: string) => {
    const value = Number(hour);
    const suffix = value >= 12 ? "PM" : "AM";
    return `${value % 12 || 12}:${minute} ${suffix}`;
  };
  return `Mon – Sun: ${to12(openHour, openMinute)} – ${to12(closeHour, closeMinute)}`;
}

const LINKS = [
  { href: "/", en: "Home", fr: "Accueil" },
  { href: "/menu", en: "Menu", fr: "Menu" },
  { href: "/about", en: "About", fr: "À propos" },
  { href: "/contact", en: "Contact", fr: "Contact" },
];

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { info } = useCatalog();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="relative z-40 bg-white">
      <div className="border-b border-[#f6e6d8]">
        <div className="mx-auto flex items-center justify-between gap-3 px-3 py-1.5 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-4 text-[11px] font-medium leading-none tracking-[0.01em] text-[#3f3f3f] sm:gap-5 lg:gap-7">
            <span className="hidden min-w-0 items-center gap-1.5 lg:flex">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-terra" strokeWidth={1.75} />
              <span className="truncate">{ADDRESS}</span>
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Clock className="h-3.5 w-3.5 shrink-0 text-terra" strokeWidth={1.75} />
              <span className="whitespace-nowrap">{hoursLabel(info?.hoursShort, lang === "fr")}</span>
            </span>
            <a href="tel:+9242111228325" className="flex min-w-0 items-center gap-1.5 hover:text-terra">
              <Phone className="h-3.5 w-3.5 shrink-0 text-terra" strokeWidth={1.75} />
              <span className="truncate">{PHONE}</span>
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {SOCIALS.map((social) => (
              <span
                key={social.label}
                aria-label={social.label}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white"
              >
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
                  <path fill="currentColor" fillRule="evenodd" d={social.path} />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>
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
