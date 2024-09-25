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

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="w-full max-w-4xl flex flex-col p-4 gap-4">
      {projects
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
    </div>
  );
}

interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  url?: string;
  date: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card>
      <Link href={`/projects/${project.slug}`}>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
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
      </Link>
    </Card>
  );
};

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), "data/projects");
  const fileNames = fs.readdirSync(projectsDirectory);

  const projects = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      name: data.name,
      shortDescription: data.shortDescription,
      url: data.url,
      date: data.date,
    };
  });

  return projects;
}
