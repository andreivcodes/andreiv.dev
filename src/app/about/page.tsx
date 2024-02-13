import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type Experience, type Project, allProjects, allExperiences } from "contentlayer/generated";
import { GlobeIcon, LinkIcon } from "lucide-react";
import Link from "next/link"

export default async function Home() {
  return (
    <main className="flex w-full max-w-7xl h-full flex-col p-2 md:p-8 gap-4 md:gap-8">
      <AboutLong />

      <div className="grid grid-cols-2 gap-2 md:gap-8">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Projects</h2>
          {allProjects.sort((a, b) => a.aboutIndex - b.aboutIndex).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 bg-stone-300 w-px"></div>
          <div className="flex flex-col gap-8 pl-2 md:pl-8">
            <h2 className="text-2xl font-bold mb-4 text-center md:text-right">Experience</h2>
            {allExperiences.sort((a, b) => a.index - b.index).map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const AboutLong = () => {
  return (
    <Card className="border-0 md:border flex flex-col gap-4 max-w-xl">
      <CardHeader className="flex flex-col">
        <div className="font-mono font-bold text-3xl">Andrei Voinea</div>
        <div className="font-mono">Full Stack Engineer</div>
        <div className="flex flex-row items-center gap-2 font-mono font-light text-sm">
          <GlobeIcon className="h-4 w-4" />
          Sibiu, Romania, GMT+2
        </div>
      </CardHeader>
      <CardContent className="font-mono text-sm">
        Former principal engineer at a leading tier 1 automotive supplier and failed startup cofounder,
        now diving into the exciting world of web technologies, web3, and entrepreneurship.
      </CardContent>
    </Card>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className={`w-full flex flex-col items-end gap-2 pt-${project.aboutTopPadding}`}>
      <div className="text-sm">
        {project.date}
      </div>
      <Separator className="-mr-2 md:-mr-8 w-32" />
      <Card className="w-full border-0 md:border">
        <CardHeader className="w-full p-2 md:p-6">
          <CardTitle>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </CardTitle>
          <CardDescription>{project.shortDescription}</CardDescription>
        </CardHeader>

        <CardFooter className="w-full flex flex-col md:flex-row justify-between p-2 md:p-6">
          <div className="flex flex-wrap gap-2">
            {project.stackPrimary && project.stackPrimary.map((stack) =>
              <Badge className="pointer-events-none" key={stack}>{stack}</Badge>
            )}
            {project.stackSecondary && project.stackSecondary.map((stack) =>
              <Badge className="pointer-events-none" variant="secondary" key={stack}>{stack}</Badge>
            )}
          </div>
          <Link href={project.url} target="_blank" className="hidden md:flex flex-row gap-2 items-center fill-stone-400 text-stone-400">
            <LinkIcon className="w-4 h-4" />{project.url}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div className={`w-full flex flex-col items-start gap-2 pt-${experience.aboutTopPadding ?? 0}`}>
      <div className="text-sm">
        {experience.endDate ? experience.endDate : "now"}
      </div>
      <Separator className="-ml-2 md:-ml-8 w-32" />
      <Card className="w-full border-0 md:border">
        <CardHeader className="w-full p-2 md:p-6">
          <CardTitle className="w-full flex flex-col gap-2">

            <div className="flex flex-wrap gap-2 text-end align-bottom justify-between">
              <div className="w-full font-semibold">{experience.companyName}</div>
              <div className="w-full text-xs font-mono font-extralight">{experience.companyAbout}</div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
              <div className="text-start text-lg">
                {experience.role}
              </div>
              <div className="justify-between font-light text-xs opacity-50">
                {experience.startDate} to {experience.endDate ? experience.endDate : "now"}
              </div>
            </div>
          </CardTitle>
          <CardDescription>{experience.shortDescription}</CardDescription>
        </CardHeader>
      </Card>
    </div >
  );
};
