import Link from "next/link";
import SideNavLink from "./potioncraft/_components/side-nav-link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const pathName = usePathname()

  const NAV_LINKS = [
    { href: "/potioncraft", label: "Craft" },
    { href: "/potioncraft/journal/potions", label: "Potions" },
    { href: "/potioncraft/journal/ingredients", label: "Ingredients" },
    { href: "/potioncraft/formulas", label: "Formulas" },
  ];

  return (
    <div className="flex">
      <div className="flex h-screen w-80 flex-col items-center space-y-2 overflow-y-auto bg-secondary/60 p-3 border border-primary/40 border-l-0">
        {NAV_LINKS.map((link) => (
          <SideNavLink href={link.href} label={link.label} />
        ))}
      </div>

      {children}
    </div>
  );
}
