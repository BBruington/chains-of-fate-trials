import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SpnnerProps = {
  className?: string;
}

export default function Spinner({className }: SpnnerProps) {
  return (
    <div className="flex items-center justify-center text-slate-500">
      <Loader2 className={cn("h-8 w-8 animate-spin", className)} />
    </div>
  );
}