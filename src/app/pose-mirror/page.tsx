"use client";

import PoseMirror from "./components/pose-mirror";
import { PageProvider } from "./page-context";

export default function Page() {
  return (
    <div className="h-full">
      <PageProvider>
        <PoseMirror />
      </PageProvider>
    </div>
  );
}
