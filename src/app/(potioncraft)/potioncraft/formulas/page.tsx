import { prisma } from "@/app/utils/context";
import { currentUser } from "@clerk/nextjs/server";
import AddFormulaButton from "./_components/add-formula-button";
import DisplayFormula from "./_components/display-formula";
import FormulaListItem from "./_components/formula-list-item";
import { getUser } from "../page";
export default async function page() {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;
  const { formulas } = await getUser(user.id);
  if (!formulas) return <div>Failed to fetch formulas</div>;

  return (
    <div className="flex h-screen w-screen">
      <DisplayFormula />
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3">
        <AddFormulaButton userId={user.id} />
        {formulas.map((formula) => (
          <FormulaListItem key={formula.id} formula={formula} />
        ))}
      </div>
    </div>
  );
}
