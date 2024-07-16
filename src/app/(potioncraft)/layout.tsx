import Link from "next/link";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex">
      <div className="flex h-screen w-80 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3">
        <Link href={"/potioncraft"}>Craft Potions</Link>
        <Link href={"/potioncraft/journal"}>Potions</Link>
        <Link href={"/potioncraft/journal"}>Ingredients</Link>
        <Link href={"/potioncraft/formulas"}>Formulas</Link>
      </div>

      {children}
    </div>
  );
}
