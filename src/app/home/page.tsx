import { AboutShort } from "@/components/about-short";

export default async function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center justify-evenly py-8 gap-4">
      <div className="flex flex-col gap-2">
        <AboutShort />
      </div>
    </main>
  );
}
