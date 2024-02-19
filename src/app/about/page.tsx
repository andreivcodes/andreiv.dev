import { AboutLong } from "@/components/about/about-long";
import { ExperienceCard } from "@/components/about/experience";
import { ProjectCard } from "@/components/about/project";
import { Skills } from "@/components/about/skills";
import { Button } from "@/components/ui/button";
import { allProjects, allExperiences } from "contentlayer/generated";

export default async function Home() {

  return (
    <main className="flex w-full max-w-7xl h-full flex-col p-2 md:p-8 gap-12 md:gap-24">
      <div className="flex flex-col md:flex-row">
        <AboutLong />
        <Skills />
      </div>
      <div className="grid grid-flow-col auto-cols-auto gap-2 md:gap-8 transition-all duration-1000">

        <div className="flex flex-col gap-8">
          <div className="text-2xl font-bold mb-4 text-center md:text-left" >Projects</div>
          <div>
            {allProjects.sort((a, b) => a.index - b.index).map((project) => (
              <ProjectCard key={project._id} project={project} hidden={false} />
            ))}
          </div>
        </div>

        <div className="inset-y-0 bg-current w-px"></div>

        <div className="flex flex-col gap-8">
          <div className="text-2xl font-bold mb-4 text-center md:text-left" > Experience</div>
          <div>
            {allExperiences.sort((a, b) => a.index - b.index).map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} hidden={false} />
            ))}
          </div>
        </div>

      </div>
    </main >
  );
}
