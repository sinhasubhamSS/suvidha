import Toggle from "@/components/Toggle";
import Image from "next/image";

export default function Home() {
  return (
  <>
   <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Toggle />
      <h1 className="mt-6 text-3xl">Theme Toggle Test</h1>
      <p className="mt-2">Current mode is visible on the button.</p>
    </div>
  </>
  );
}
