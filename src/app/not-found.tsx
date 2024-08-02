"use client";
import animation404 from "@/animations/404.json";
import Lottie from "lottie-react";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Lottie loop animationData={animation404} />
      <Link className="text-blue-900 text-2xl hover:text-blue-400" href={"/"}>Return Home</Link>
    </div>
  );
}
