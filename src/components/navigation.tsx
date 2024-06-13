import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
export default function Navigation() {
  return (
    <div className="px-2 space-x-2 items-center flex justify-end border-b-2 border-slate-300">
      <div className="flex items-center space-x-2">
        <Switch className="" id="dark-mode" />
        <Label htmlFor="dark-mode">Dark Mode</Label>
      </div>
      <div className="my-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
