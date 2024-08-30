import JokeGenerator from "@/components/JokeGenerator";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      <ModeToggle />
      <JokeGenerator />
    </main>
  );
}
