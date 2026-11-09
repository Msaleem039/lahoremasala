"use client";

import { useCatalog } from "../context/CatalogContext";
import { useLanguage } from "../context/LanguageContext";

export function OrderingBanner() {
  const { info } = useCatalog();
  const { t, lang } = useLanguage();
  if (!info || info.openNow) return null;
  const when = info.nextOpenAt
    ? new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: info.timezone,
      }).format(new Date(info.nextOpenAt))
    : "";
  return (
    <p className="bg-[#ffe4ea] px-4 py-2 text-center text-sm font-semibold text-terra-deep">
      {info.allowScheduled
        ? t(
            `The kitchen is closed for immediate orders${when ? `. The next opening is ${when}` : ""}. You can schedule one at checkout.`,
            `La cuisine est fermée pour les commandes immédiates${when ? `. Prochaine ouverture : ${when}` : ""}. Vous pouvez programmer un créneau au paiement.`,
          )
        : t(
            `Ordering is closed${when ? ` until ${when}` : ""}.`,
            `Les commandes sont fermées${when ? ` jusqu'au ${when}` : ""}.`,
          )}
    </p>
  );
}
