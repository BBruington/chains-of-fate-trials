import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex">
      <div className="flex h-screen w-80 flex-col items-center overflow-y-auto bg-secondary p-3">
        <Link href={"/potioncraft"}>ingredients</Link>
        <Link href={"/potioncraft/formulas"}>formulas</Link>
        <Link href={"/potioncraft/journal"}>journal</Link>
      </div>

      {children}
    </div>
  );
}
