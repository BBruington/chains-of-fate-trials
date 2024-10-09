import SilentPose from "./_components/silent-pose";
import { PageProvider } from "./page-context";

export default async function Page() {
  return (
    <PageProvider>
      <SilentPose />
    </PageProvider>
  );
}
