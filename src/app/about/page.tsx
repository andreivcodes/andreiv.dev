import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type Experience, type Project, allProjects, allExperiences } from "contentlayer/generated";
import { GlobeIcon } from "lucide-react";
import { getMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link"

export default async function Home() {
  return (
    <main className="flex w-full max-w-7xl h-full flex-col p-2 md:p-8 gap-4 md:gap-8">
      <div className="flex flex-col md:flex-row">
        <AboutLong />
        <Skills />
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-8">
        <div className="flex flex-col gap-8">
          <div className="text-2xl font-bold mb-4 text-center md:text-left">Projects</div>
          <div>
            {allProjects.sort((a, b) => a.index - b.index).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 bg-stone-300 w-px"></div>
          <div className="flex flex-col gap-8 pl-2 md:pl-8">
            <div className="text-2xl font-bold mb-4 text-center md:text-right">Experience</div>
            <div>
              {allExperiences.sort((a, b) => a.index - b.index).map((experience) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const primarySkills = ["javascript", "typescript", "rust", "c", "react", "nextjs", "sql", "web3", "docker", "aws", "serverless"];
const secondarySkills = ["htmx", "flutter", "react native", "system design", "autosar", "embedded software"];
const Skills = () => {
  return <div className="w-full m-auto max-w-sm flex flex-row flex-wrap gap-2 h-fit items-center justify-center">
    {primarySkills.map((skill) => <div key={skill}><Badge>{skill}</Badge></div>)}
    {secondarySkills.map((skill) => <div key={skill}><Badge variant="secondary">{skill}</Badge></div>)}
  </div>
}

const AboutLong = () => {
  return (
    <Card className="shadow-none md:shadow-sm border-0 md:border flex flex-col gap-4 max-w-xl">
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
      <Card className="w-full shadow-none md:shadow-sm border-0 md:border">
        <CardHeader className="w-full p-2 md:p-6">
          <CardTitle>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm">{project.shortDescription}</CardContent>

        <CardFooter className="w-full flex flex-col md:flex-row justify-between p-2 md:p-6">
          <div className="flex flex-wrap gap-2">
            {project.stackPrimary && project.stackPrimary.map((stack) =>
              <Badge className="pointer-events-none" key={stack}>{stack}</Badge>
            )}
            {project.stackSecondary && project.stackSecondary.map((stack) =>
              <Badge className="pointer-events-none" variant="secondary" key={stack}>{stack}</Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const Content = getMDXComponent(experience.body.code);

  return (
    <div className={`w-full flex flex-col items-start gap-2 pt-${experience.aboutTopPadding ?? 0}`}>
      <div className="text-sm">
        {experience.endDate ? experience.endDate : "now"}
      </div>
      <Separator className="-ml-2 md:-ml-8 w-32" />
      <Card className="w-full shadow-none md:shadow-sm border-0 md:border">
        <CardHeader className="w-full p-2 md:p-6">
          <CardTitle className="w-full flex flex-col gap-2">

            <div className="w-full flex flex-row justify-between gap-2 align-bottom">
              <div className="font-semibold">{experience.companyName}</div>
              <div className="hidden md:block text-xs font-mono font-extralight">{experience.companyAbout}</div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
              <div className="text-start text-lg">
                {experience.role}
              </div>
              <div className="justify-between font-light text-sm opacity-50">
                {experience.startDate} to {experience.endDate ? experience.endDate : "now"}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Content />
        </CardContent>

      </Card>
    </div >
  );
};
