import { AboutLong } from "@/components/about/about-long";
import { Experiences } from "@/components/about/experience";
import { Projects } from "@/components/about/project";
import { Skills } from "@/components/about/skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function About() {
  return (
    <main className="flex w-full max-w-7xl h-full flex-col p-2 md:p-8 gap-12 md:gap-24">
      <div className="flex flex-col md:flex-row">
        <AboutLong />
        <Skills />
      </div>

      <div className="w-full flex flex-col justify-center items-center px-4 md:hidden">
        <Tabs
          defaultValue="experience"
          className="justify-center flex flex-col"
        >
          <TabsList className="self-center">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <div className="flex flex-row gap-2">
              <Projects withTitle={false} />
              <div className="bg-current w-[1px]" />
            </div>
          </TabsContent>
          <TabsContent value="experience">
            <div className="flex flex-row gap-2">
              <div className="bg-current w-[2px]" />
              <Experiences withTitle={false} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden md:grid grid-flow-col auto-cols-auto gap-8">
        <Projects withTitle={true} />
        <div className="inset-y-0 bg-current w-px"></div>
        <Experiences withTitle={true} />
      </div>
    </main>
  );
}
