"use client";
import "../components/loading-route.scss";

export default function loading() {
  return (
    <>
      <div
        className={
          "line visible absolute top-12 h-[3xp] w-full border border-primary"
        }
      />
    </>
  );
}
