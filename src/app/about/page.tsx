import { AboutLong } from "@/components/about-long";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Experience, Project, allProjects, allExperiences } from "contentlayer/generated";
import { parseISO } from "date-fns";
import { LinkIcon } from "lucide-react";
import Link from "next/link"


export default async function Home() {
  return (
    <main className="flex w-full max-w-7xl h-full flex-col p-8 gap-4">
      <AboutLong />
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          {allProjects
            .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
            .map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
              />
            ))}
        </div>
        <div className="flex flex-col gap-2">
          {allExperiences
            .sort((a, b) => parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime())
            .map((experience) => (
              <ExperienceCard
                key={experience.companyName}
                experience={experience}
              />
            ))}
        </div>

      </div>

    </main >
  );
}


const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </CardTitle>
        <CardDescription>{project.shortDescription}</CardDescription>
      </CardHeader>

      <CardFooter className="w-full justify-between">
        <div className="flex flex-row gap-2">
          {project.stackPrimary && project.stackPrimary.map((stack) =>
            <Badge className="pointer-events-none" key={stack}>{stack}</Badge>
          )}
          {project.stackSecondary && project.stackSecondary.map((stack) =>
            <Badge className="pointer-events-none" variant="secondary" key={stack}>{stack}</Badge>
          )}
        </div>
        <Link href={project.url} target="_blank" className="flex flex-row gap-2 items-center fill-stone-400 text-stone-400">
          <LinkIcon className="w-4 h-4" />{project.url}
        </Link>
      </CardFooter>
    </Card>
  );
};


const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <div>{experience.companyName}</div>
          <div className="font-mono text-lg">{experience.role}</div>

        </CardTitle>
        <CardDescription>{experience.shortDescription}</CardDescription>
      </CardHeader>

      <CardFooter className="w-full justify-between font-mono font-light text-sm opacity-50">
        {experience.startDate} to {experience.endDate ? experience.endDate : "now"}
      </CardFooter>
    </Card>
  );
};
