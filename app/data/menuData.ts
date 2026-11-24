export type MenuCategory = "formules" | "poulet" | "biryanis" | "vegetariens" | "entrees";

export interface DishVariant {
  id: string;
  group: string;
  name: string;
  priceDelta: number;
  available: boolean;
}

export interface DishExtra {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface Dish {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  /** Legacy catalog field. Customer ratings come from verified reviews, not this value. */
  rating?: number;
  image: string;
  description: string;
  slug?: string;
  available?: boolean;
  orderable?: boolean;
  stock?: number | null;
  allergens?: string;
  ingredients?: string;
  isCombo?: boolean;
  variants?: DishVariant[];
  extras?: DishExtra[];
  reviewAverage?: number | null;
  reviewCount?: number;
  relatedIds?: string[];
}

export const CATEGORIES: { slug: MenuCategory | "all"; label: string }[] = [
  { slug: "all", label: "All" },
  { slug: "formules", label: "Formules spéciales" },
  { slug: "poulet", label: "Plats poulet" },
  { slug: "biryanis", label: "Biryani" },
  { slug: "vegetariens", label: "Plats végétariens" },
  { slug: "entrees", label: "Entrées" },
];

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const DECOUVERTE =
  "Pour 1 personne : 1 Butter Chicken (morceaux de poulet dans une sauce douce à la tomate et à la crème), 1 portion de riz basmati blanc, 1 samosa végétarien croustillant et 1 boisson 33 cl au choix.";
const GOURMET =
  "Pour 2 personnes : 1 plat au choix entre Chicken Tikka Masala (poulet en sauce tomate épicée) et Chicken Achari (poulet aux épices et saveurs acidulées), 1 portion de riz basmati blanc, 4 pakoras végétariens et 1 boisson 33 cl au choix.";
const DUO =
  "Pour 2 personnes : 2 currys de poulet au choix parmi les plats proposés, 2 portions de riz basmati blanc, 2 samosas végétariens croustillants et 2 boissons 33 cl au choix.";

export const DISHES: Dish[] = [
  {
    id: "fo-1",
    name: "Menu Découverte Lahore",
    category: "formules",
    price: 22.9,
    image: "/menu/decouverte.jpg",
    description: DECOUVERTE,
    isCombo: true,
  },
  {
    id: "fo-2",
    name: "Menu Découverte Gourmande",
    category: "formules",
    price: 37,
    image: "/menu/gourmande.jpg",
    description: GOURMET,
    isCombo: true,
  },
  {
    id: "fo-3",
    name: "Formule Duo Lahore",
    category: "formules",
    price: 37,
    image: "/menu/duo.jpg",
    description: DUO,
    isCombo: true,
  },
  {
    id: "sp-1",
    name: "Butter Chicken",
    category: "poulet",
    price: 15.9,
    image: "/menu/butter-chicken.jpg",
    description: "Blanc de poulet, sauce au beurre, crème fraîche, noix de cajou et cumin. Servi avec 1 barquette de riz basmati blanc.",
  },
  {
    id: "pk-2",
    name: "Poulet Tikka Masala",
    category: "poulet",
    price: 15.9,
    image: "/menu/tikka-masala.jpg",
    description: "Poulet tikka à la sauce du garam masala, épices traditionnelles indiennes, oignons, coriandre, tomates, gingembre, poivrons et citron. Servi avec 1 barquette de riz basmati blanc.",
  },
  {
    id: "pk-3",
    name: "Chicken Masala",
    category: "poulet",
    price: 15.9,
    image: "/menu/chicken-masala.jpg",
    description: "Poulet grillé à la sauce tomate épicée, tomates fraîches, oignons et épices indiennes. Servi avec 1 barquette de riz basmati blanc.",
  },
  {
    id: "pk-4",
    name: "Chicken Shahi Korma",
    category: "poulet",
    price: 15.9,
    image: "/menu/shahi-korma.jpg",
    description: "Morceaux de poulet désossés, préparés dans une sauce à base de crème fraîche, avec amandes et noix de cajou. Servi avec 1 barquette de riz basmati blanc.",
  },
  {
    id: "pk-5",
    name: "Chicken Karahi",
    category: "poulet",
    price: 15.9,
    image: img("photo-1574484284002-952d92456975"),
    description: "Poulet cuisiné façon karahi.",
  },
  {
    id: "pk-6",
    name: "Chicken Madras",
    category: "poulet",
    price: 15.9,
    image: img("photo-1585937421612-70a008356fbe"),
    description: "Poulet dans une sauce madras.",
  },
  {
    id: "pk-7",
    name: "Chicken Achari",
    category: "poulet",
    price: 16.5,
    image: img("photo-1565557623262-b51c2513a641"),
    description: "Poulet aux épices et saveurs acidulées.",
  },
  {
    id: "pk-8",
    name: "Chicken Bhuna",
    category: "poulet",
    price: 17,
    image: img("photo-1545247181-516773cae754"),
    description: "Poulet bhuna, sauce réduite et épicée.",
  },
  {
    id: "by-1",
    name: "Biryani",
    category: "biryanis",
    price: 17,
    image: "/menu/biryani.jpg",
    description: "Morceaux de poulet, coriandre fraîche, oignons, poivrons et épices spéciales biryani.",
  },
  {
    id: "by-2",
    name: "Biryani Végétarien",
    category: "biryanis",
    price: 16,
    image: "/menu/biryani-veg.jpg",
    description: "Riz basmati aux légumes de saison, pommes de terre, oignons, gingembre, poivrons et épices spéciales biryani.",
  },
  {
    id: "vg-1",
    name: "Masala Dal",
    category: "vegetariens",
    price: 14.5,
    image: "/menu/masala-dal.jpg",
    description: "Lentilles, gingembre, tomates fraîches, coriandre fraîche et épices indiennes. Servi avec 1 barquette de riz basmati blanc.",
  },
  {
    id: "vg-2",
    name: "Mix Vegetables",
    category: "vegetariens",
    price: 14.5,
    image: "/menu/mix-vegetables.jpg",
    description: "Mélange de légumes frais de saison et épices indiennes. Servi avec 1 barquette de riz basmati blanc.",
  },
  {
    id: "vg-3",
    name: "Palak Paneer",
    category: "vegetariens",
    price: 15,
    image: img("photo-1585937421612-70a008356fbe"),
    description: "Épinards et paneer.",
  },
  {
    id: "en-1",
    name: "Samosas végétariens",
    category: "entrees",
    price: 4,
    image: "/menu/samosas.jpg",
    description: "Beignets farcis aux pommes de terre. 2 pièces.",
  },
  {
    id: "en-2",
    name: "Pakoras végétariens",
    category: "entrees",
    price: 5,
    image: "/menu/pakora.jpg",
    description: "Beignets aux légumes. 3 pièces.",
  },
];

export const MENU_ITEMS = DISHES;
export const ALL_MENU_DISHES = DISHES;

const CATEGORY_TEXT: Record<string, { en: string; fr: string }> = {
  all: { en: "All", fr: "Tout" },
  formules: { en: "Special menus", fr: "Formules spéciales" },
  poulet: { en: "Chicken dishes", fr: "Plats poulet" },
  biryanis: { en: "Biryani", fr: "Biryani" },
  vegetariens: { en: "Vegetarian dishes", fr: "Plats végétariens" },
  entrees: { en: "Starters", fr: "Entrées" },
};

export function categoryLabel(slug: string, lang: "en" | "fr" = "fr") {
  return CATEGORY_TEXT[slug]?.[lang] ?? CATEGORIES.find((category) => category.slug === slug)?.label ?? slug.replace(/-/g, " ");
}

const DESCRIPTION_PAIRS: [string, string][] = [
  [
    "For 1 person: 1 Butter Chicken (chicken pieces in a mild tomato and cream sauce), 1 portion of white basmati rice, 1 crisp vegetarian samosa and 1 drink 33 cl of your choice.",
    DECOUVERTE,
  ],
  [
    "For 2 people: 1 dish chosen between Chicken Tikka Masala (chicken in a spiced tomato sauce) and Chicken Achari (chicken with spices and a tangy flavour), 1 portion of white basmati rice, 4 vegetarian pakoras and 1 drink 33 cl of your choice.",
    GOURMET,
  ],
  [
    "For 2 people: 2 chicken curries of your choice from the dishes on the menu, 2 portions of white basmati rice, 2 crisp vegetarian samosas and 2 drinks 33 cl of your choice.",
    DUO,
  ],
  ["Chicken breast in a butter sauce with cream, cashews and cumin. Served with 1 portion of white basmati rice.", "Blanc de poulet, sauce au beurre, crème fraîche, noix de cajou et cumin. Servi avec 1 barquette de riz basmati blanc."],
  ["Tikka chicken in a garam masala sauce with onion, coriander, tomato, ginger, pepper and lemon. Served with 1 portion of white basmati rice.", "Poulet tikka à la sauce du garam masala, épices traditionnelles indiennes, oignons, coriandre, tomates, gingembre, poivrons et citron. Servi avec 1 barquette de riz basmati blanc."],
  ["Grilled chicken in a spiced tomato sauce with fresh tomatoes, onion and Indian spices. Served with 1 portion of white basmati rice.", "Poulet grillé à la sauce tomate épicée, tomates fraîches, oignons et épices indiennes. Servi avec 1 barquette de riz basmati blanc."],
  ["Boneless chicken in a cream sauce with almonds and cashews. Served with 1 portion of white basmati rice.", "Morceaux de poulet désossés, préparés dans une sauce à base de crème fraîche, avec amandes et noix de cajou. Servi avec 1 barquette de riz basmati blanc."],
  ["Chicken cooked karahi style.", "Poulet cuisiné façon karahi."],
  ["Chicken in a madras sauce.", "Poulet dans une sauce madras."],
  ["Chicken with spices and a tangy flavour.", "Poulet aux épices et saveurs acidulées."],
  ["Bhuna chicken in a reduced spiced sauce.", "Poulet bhuna, sauce réduite et épicée."],
  ["Chicken, fresh coriander, onion, pepper and biryani spices.", "Morceaux de poulet, coriandre fraîche, oignons, poivrons et épices spéciales biryani."],
  ["Basmati rice with seasonal vegetables, potato, onion, ginger, pepper and biryani spices.", "Riz basmati aux légumes de saison, pommes de terre, oignons, gingembre, poivrons et épices spéciales biryani."],
  ["Lentils, ginger, fresh tomatoes, fresh coriander and Indian spices. Served with 1 portion of white basmati rice.", "Lentilles, gingembre, tomates fraîches, coriandre fraîche et épices indiennes. Servi avec 1 barquette de riz basmati blanc."],
  ["Seasonal vegetables and Indian spices. Served with 1 portion of white basmati rice.", "Mélange de légumes frais de saison et épices indiennes. Servi avec 1 barquette de riz basmati blanc."],
  ["Spinach and paneer.", "Épinards et paneer."],
  ["Potato-filled fritters. 2 pieces.", "Beignets farcis aux pommes de terre. 2 pièces."],
  ["Vegetable fritters. 3 pieces.", "Beignets aux légumes. 3 pièces."],
];

export function dishDescription(description: string, lang: "en" | "fr") {
  const pair = DESCRIPTION_PAIRS.find(([en, fr]) => description === en || description === fr);
  if (!pair) return description;
  return lang === "fr" ? pair[1] : pair[0];
}

const NAME_PAIRS: [string, string][] = [
  ["Lahore Discovery Menu", "Menu Découverte Lahore"],
  ["Gourmet Discovery Menu", "Menu Découverte Gourmande"],
  ["Lahore Duo Menu", "Formule Duo Lahore"],
  ["Butter Chicken", "Butter Chicken"],
  ["Chicken Tikka Masala", "Poulet Tikka Masala"],
  ["Chicken Masala", "Chicken Masala"],
  ["Chicken Shahi Korma", "Chicken Shahi Korma"],
  ["Chicken Karahi", "Chicken Karahi"],
  ["Chicken Madras", "Chicken Madras"],
  ["Chicken Achari", "Chicken Achari"],
  ["Chicken Bhuna", "Chicken Bhuna"],
  ["Biryani", "Biryani"],
  ["Vegetable Biryani", "Biryani Végétarien"],
  ["Masala Dal", "Masala Dal"],
  ["Mixed Vegetables", "Mix Vegetables"],
  ["Palak Paneer", "Palak Paneer"],
  ["Vegetarian Samosas", "Samosas végétariens"],
  ["Vegetarian Pakoras", "Pakoras végétariens"],
];

export function dishName(name: string, lang: "en" | "fr") {
  const pair = NAME_PAIRS.find(([en, fr]) => name === en || name === fr);
  if (!pair) return name;
  return lang === "fr" ? pair[1] : pair[0];
}

export function dishesByCategory(slug: string) {
  if (slug === "all") return DISHES;
  return DISHES.filter((dish) => dish.category === slug);
}

export function dishSlug(dish: { id: string; name: string; slug?: string }) {
  if (dish.slug) return dish.slug;
  const base = dish.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || dish.id;
}

export function dishPath(dish: { id: string; name: string; slug?: string }) {
  return `/plat/${dishSlug(dish)}`;
}
