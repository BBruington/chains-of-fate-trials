import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NAV_LINKS = [
    { href: "/potioncraft", label: "Craft" },
    { href: "/potioncraft/journal/potions", label: "Potions" },
    { href: "/potioncraft/journal/ingredients", label: "Ingredients" },
    { href: "/potioncraft/journal/ingredients", label: "Formulas" },
  ];

  return (
    <div className="flex">
      <div className="flex h-screen w-80 flex-col items-center space-y-2 overflow-y-auto bg-secondary/60 p-3 border border-primary/40 border-l-0">
        {NAV_LINKS.map((link) => (
          <Link
            className="flex items-center pl-2 h-10 w-full rounded-lg border-b hover:bg-secondary hover:text-primary/80"
            key={link.label}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
