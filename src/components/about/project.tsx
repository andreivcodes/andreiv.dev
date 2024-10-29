import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { getProjects, ProjectType } from "@/lib/mdx";
import { LinkIcon } from "lucide-react";

export const Projects = async ({ withTitle }: { withTitle: boolean }) => {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
      {withTitle && (
        <div className="text-2xl font-bold mb-4 text-center md:text-left">
          Projects
        </div>
      )}
      <div>
        {projects
          .filter((p) => p.inAbout)
          .sort((a, b) => a.index - b.index)
          .map((project) => (
            <ProjectCard key={project.slug} project={project} hidden={false} />
          ))}
      </div>
    </div>
  );
};

export const ProjectCard = ({
  project,
  hidden,
}: {
  project: ProjectType;
  hidden: boolean;
}) => {
  if (hidden) return null;
  return (
    <div
      className={`w-full flex flex-col items-end gap-2 pt-${project.aboutTopPadding}`}
    >
      <div className="text-sm">{project.date}</div>
      <Separator className="-mr-2 md:-mr-8 w-32" />
      <Card className="w-full shadow-none md:shadow-sm border-0 md:border">
        <CardHeader className="w-full p-2 md:p-6">
          <CardTitle>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm">
          {project.shortDescription}
        </CardContent>

        <CardFooter className="w-full flex flex-col md:flex-row justify-between p-2 md:p-6">
          <div className="flex flex-wrap gap-2">
            {project.stackPrimary &&
              project.stackPrimary.map((stack) => (
                <Badge className="pointer-events-none" key={stack}>
                  {stack}
                </Badge>
              ))}
            {project.stackSecondary &&
              project.stackSecondary.map((stack) => (
                <Badge
                  className="pointer-events-none"
                  variant="secondary"
                  key={stack}
                >
                  {stack}
                </Badge>
              ))}
          </div>
          {project.url || project.demoUrl ? (
            <Link
              href={project.url ?? project.demoUrl}
              target="_blank"
              className="flex flex-row gap-2 items-center fill-stone-400 text-stone-400"
            >
              <LinkIcon className="w-4 h-4" />
              {project.url ?? `Demo: ${project.demoUrl}`}
            </Link>
          ) : (
            <div></div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
