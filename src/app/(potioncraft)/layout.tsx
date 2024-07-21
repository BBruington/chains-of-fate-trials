import SideNavLink from "./potioncraft/_components/side-nav-link";
import serum from "@/../public/icons/serum.png";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const NAV_LINKS = [
    { href: "/potioncraft", label: "Craft", icon: serum },
    { href: "/potioncraft/journal/potions", label: "Potions", icon: serum  },
    { href: "/potioncraft/journal/ingredients", label: "Ingredients", icon: serum  },
    { href: "/potioncraft/formulas", label: "Formulas", icon: serum  },
  ];

  return (
    <div className="flex">
      <div className="flex h-screen w-80 flex-col items-center space-y-2 overflow-y-auto bg-secondary/60 p-3 border border-primary/40 border-l-0">
        {NAV_LINKS.map((link) => (
          <SideNavLink key={link.label} href={link.href} label={link.label} icon={link.icon} />
        ))}
      </div>

      {children}
    </div>
  );
}
