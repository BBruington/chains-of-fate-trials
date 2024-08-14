import SilentPose from "./_components/silent-pose";
import { PageProvider } from "./page-context";

export default function Page() {
  return (
    <PageProvider>
      <SilentPose />
    </PageProvider>
  );
}
