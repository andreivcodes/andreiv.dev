import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { getProjects, ProjectType } from "@/lib/mdx";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="w-full max-w-4xl flex flex-col p-4 gap-4">
      {projects
        .sort((a, b) => a.index - b.index)
        .map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
    </div>
  );
}

const ProjectCard = ({ project }: { project: ProjectType }) => {
  return (
    <Card>
      <Link href={`/projects/${project.slug}`}>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.shortDescription}</CardDescription>
        </CardHeader>
      </Link>

      <CardFooter className="w-full justify-between">
        {project.url || project.demoUrl ? (
          <Link
            href={project.url ?? project.demoUrl}
            target="_blank"
            className="flex flex-row gap-2 items-center fill-stone-400 text-stone-400"
          >
            <LinkIcon className="w-4 h-4" />
            {project.url ? "Visit Project" : "Visit Demo"}
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
