import { prisma } from "@/app/utils/context";
import Formulas from "./_components/formulas";
import { currentUser } from "@clerk/nextjs/server";
export default async function page() {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;
  const formulas = await prisma.formula.findMany({
    where: {
      userId: user.id,
    },
  });
  return <Formulas formulas={formulas} userId={user.id} />;
}
