import Image from "next/image";

import { ImageDisplayProps } from "@/app/pose-mirror/types";

export default function ImageDisplay({ image }: ImageDisplayProps) {
  return (
    <div>
      {image ? (
        <Image
          alt={`${image}`}
          src={`${image}`}
          fill
          sizes="90.406px"
          style={{ objectFit: "cover" }}
          className="z-10 rounded-md border-2 border-neutral-800"
        />
      ) : null}
    </div>
  );
}
