"use server";
import { currentUser } from "@clerk/nextjs/server";
import PoseMirror from "./components/pose-mirror";
import { PageProvider } from "./page-context";

export default async function Page() {
  const user = await currentUser();
  const userData = {
    id: user?.id || "",
  };

  return (
    <div className="h-full w-full">
      <PageProvider>
        <PoseMirror currentUser={userData} userData={userData.id} />
      </PageProvider>
    </div>
  );
}
