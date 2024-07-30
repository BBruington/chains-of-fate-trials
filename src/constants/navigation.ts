import scroll from "@/../public/icons/scroll.svg";
import potion from "@/../public/icons/potion.svg";
import herb from "@/../public/icons/herb.svg";
import anvil from "@/../public/icons/anvil.svg";

export const NAV_LINKS = [
  { href: "/potioncraft", label: "Craft", icon: anvil },
  { href: "/potioncraft/journal/potions", label: "Potions", icon: potion },
  {
    href: "/potioncraft/journal/ingredients",
    label: "Ingredients",
    icon: herb,
  },
  { href: "/potioncraft/formulas", label: "Formulas", icon: scroll },
];
