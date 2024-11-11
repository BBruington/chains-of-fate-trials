"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { handlePlayTrials } from "../actions";
import { useRouter } from "next/navigation";
const DEFAULT_IMAGE_URL =
  "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg";
export default function PlayTrialsComponent() {
  const router = useRouter();
  const handleStartTrials = async () => {
    const trialSession = await handlePlayTrials({
      sessionId: "TheTrialsoftheElements",
    });
    if (trialSession) {
      router.push(`/session/${trialSession}`);
    }
  };
  return (
    <>
      <button
        onClick={handleStartTrials}
        className={cn(
          "group cursor-pointer overflow-hidden rounded-lg border border-primary-foreground",
          "transition-all duration-200 ease-in-out hover:shadow-lg",
        )}
      >
        <div className="relative h-60 w-full">
          <Image
            fill={true}
            style={{ objectFit: "cover" }}
            className="transition-transform duration-200 ease-in-out group-hover:scale-105"
            src={DEFAULT_IMAGE_URL}
            alt="session main image"
          />
        </div>
        <div className="flex justify-between bg-accent-foreground p-5">
          <div>
            <h3 className="truncate text-lg font-bold text-black">
              The Trials of the Elements
            </h3>
            <p className="flex text-xs text-black">By: Benjamin Bruington</p>
          </div>
        </div>
      </button>
    </>
  );
}
