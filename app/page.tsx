import JokeGenerator from "@/components/JokeGenerator";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="w-full fixed top-0 left-0 p-4 flex justify-end">
        <ModeToggle />
      </header>

      <div className="flex-grow flex items-center justify-center mt-16">
        <JokeGenerator />
      </div>
    </main>
  );
}
