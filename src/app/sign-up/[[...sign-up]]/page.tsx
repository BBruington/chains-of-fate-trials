import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <SignUp />
    </div>
  )
}