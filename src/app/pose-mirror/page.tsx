"use client";

import PoseList from "./components/pose-list/pose-list";
import { PageProvider } from "./page-context";

export default function Page() {
  return (
    <div className="h-full">
      <PageProvider>
        <PoseList />
      </PageProvider>
    </div>
  );
}
