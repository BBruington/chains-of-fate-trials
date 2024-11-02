"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
type SessionCardProps = {
  session: {
    id: string;
    userId: string;
    title: string;
  };
};

export default function PlaySessionCard({ session }: SessionCardProps) {
  return (
    <Link
      href={`/session/play/${session.id}`}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-lg border border-primary-foreground",
        "transition-all duration-200 ease-in-out hover:shadow-lg",
      )}
    >
      <div className="relative h-60 w-full">
        {/* <Image
            fill={true}
            style={{ objectFit: "cover" }}
            className="transition-transform duration-200 ease-in-out group-hover:scale-105"
            src={DEFAULT_IMAGE_URL}
            alt="session main image"
          /> */}
      </div>
      <div className="flex justify-between bg-accent-foreground p-5">
        <div>
          <h3 className="truncate text-lg font-bold text-black">
            {session.title}
          </h3>
          <p className="flex text-xs text-black">By: Benjamin Bruington</p>
        </div>
      </div>
    </Link>
  );
}
