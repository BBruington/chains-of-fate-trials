import { currentUser } from "@clerk/nextjs/server";
import FormulaPage from "./_components/formula-page";
import { getUser } from "../page";
export default async function page() {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;
  const { formulas } = await getUser(user.id);
  if (!formulas) return <div>Failed to fetch formulas</div>;

  return (
    <div className="flex h-[calc(100vh-48px)] w-screen">
      <FormulaPage formulas={formulas} userId={user.id} />
    </div>
  );
}
