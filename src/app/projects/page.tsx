import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project, allProjects } from "contentlayer/generated";
import { parseISO } from "date-fns";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default async function Blog() {
  return (
    <div className="w-full max-w-4xl flex flex-col p-4 gap-4">
      {allProjects
        .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
        .map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
    </div>
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
        {project.url ? (
          <Link
            href={project.url}
            target="_blank"
            className="flex flex-row gap-2 items-center fill-stone-400 text-stone-400"
          >
            <LinkIcon className="w-4 h-4" />
            {project.url}
          </Link>
        ) : (
          <div></div>
        )}

        <div className="text-xs font-thin font-mono text-stone-400">
          {project.date}
        </div>
      </CardFooter>
    </Card>
  );
};
